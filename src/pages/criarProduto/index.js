import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import axios from 'axios';
import client from '../../client';
import style from './style';
import logoImg from '../../../assets/icon.png';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default function paginaPrincipal() {
	const navigation = useNavigation();

	const [text, setText] = useState('');
	const [productTitle, setProductTitle] = useState('');
	// TODO: change defaultValue to string somehow
	const [productPrice, setProductPrice] = useState(0);
	const [productCategory, setProductCategory] = useState('');
	const [checkState, setCheckState] = useState(false);
	const [localTradeState, setLocalTradeState] = useState(false);
	const [categoryID, setCategoryID] = useState('');
	const [friendsInclusion, setFriendsInclusion] = useState(false);

	let [fontsLoaded] = useFonts({
		Inter_500Medium,
	});

	const getData = async (key) => {
		try {
			const value = await AsyncStorage.getItem(key);
			return value;
		} catch (e) {
			console.error(e);
		}
	};

	function navigateToHomePage() {
		navigation.navigate('paginaPrincipal');
	}
	async function postProduct() {
		const access_token = await AsyncStorage.getItem('auth');
		const location = await client.get('/getLocation', {
			headers: {
				Authorization: access_token.split('"')[1],
			},
		});
		const userInfo = await axios.get(
			`https://api.mercadolibre.com/users/me?access_token=${
				access_token.split('"')[1]
			}`
		);
		const productData = {
			post: {
				title: productTitle,
				category_id: 'MLB5529',
				price: productPrice,
				currency_id: 'BRL',
				available_quantity: 1,
				buying_mode: 'buy_it_now',
				listing_type_id: 'bronze',
				condition: 'new',
				description: {
					plain_text: `Lorem ipsum ${productTitle}`,
				},
				seller_address: {
					state_id: location.data,
					city: {
						name: userInfo.data.address.city,
					},
				},
				video_id: 'YOUTUBE_ID_HERE',
				sale_terms: [
					{
						id: 'WARRANTY_TYPE',
						value_name: 'Garantia do vendedor',
					},
					{
						id: 'WARRANTY_TIME',
						value_name: '90 días',
					},
				],
				pictures: [
					{
						source:
							'http://upload.wikimedia.org/wikipedia/commons/f/fd/Ray_Ban_Original_Wayfarer.jpg',
					},
					{
						source:
							'http://en.wikipedia.org/wiki/File:Teashades.gif',
					},
				],
			},
			troca: {
				permitida: checkState,
				categoria_interesse: null,
			},
			retiradaLocal: {
				permitida: localTradeState,
			},
		};

		let authKey = await getData('auth');
		authKey = authKey.replace(/['"]+/g, '');

		const response = await client.post('/criarAnuncio', productData, {
			headers: {
				Authorization: authKey,
			},
		});

		if (response.status === 200) {
			alert('Produto anunciado com sucesso');
			navigateToHomePage();
		}
	}

	function toggleCheck() {
		setCheckState(!checkState);
	}

	async function predictProductCategory(productName) {
		try {
			const response = await client.get(
				`/predict-category/${productName}`
			);

			// TODO: adicionar múltipla escolha para categorias adequadas
			setProductCategory(response.data.name);
		} catch (err) {
			console.error(err);
		}
	}

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<View style={style.container}>
				<Text style={style.title}>Criar produto</Text>

				<Text style={style.titleInputTitle}>Título</Text>
				<TextInput
					style={style.titleInput}
					placeholder="Digite o título do seu produto..."
					onChangeText={(text) => {
						setProductTitle(text);
						if (text.length > 3) {
							predictProductCategory(text);
						} else {
							setProductCategory('');
						}
					}}
					defaultValue={productTitle}
				/>

				<Text style={style.titleInputTitle}>Preço</Text>
				<TextInput
					style={style.titleInput}
					placeholder="R$ 0,00"
					onChangeText={(text) => {
						setProductPrice(text);
					}}
					defaultValue={productPrice}
				/>

				<Text style={style.titleInputTitle}>Categoria</Text>
				<TextInput
					style={style.titleInput}
					placeholder="Digite a categoria do seu produto..."
					onChangeText={(text) => setProductCategory(text)}
					defaultValue={productCategory}
				/>

				<View style={style.tradeWrapper}>
					<CheckBox
						style={style.checkboxStyle}
						disabled={false}
						value={checkState}
						onValueChange={() => {
							setCheckState(!checkState);
						}}
					/>

					<Text style={style.tradeTitle}>Aceito trocas</Text>
				</View>

				<View style={style.tradeWrapper}>
					<CheckBox
						checkboxColor="#000"
						style={style.checkboxStyle}
						disabled={false}
						value={localTradeState}
						onValueChange={() => {
							setFriendsInclusion(!friendsInclusion);
						}}
					/>

					<Text style={style.tradeTitle}>
						Aceito entregar presencialmente
					</Text>
				</View>

				<View style={style.tradeWrapper}>
					<CheckBox
						checkboxColor="#000"
						style={style.checkboxStyle}
						disabled={false}
						value={localTradeState}
						uncheckedColor="#fff"
						onValueChange={() => {
							setLocalTradeState(!localTradeState);
						}}
					/>

					<Text style={style.tradeTitle}>Notificar meus amigos</Text>
				</View>

				<TouchableOpacity onPress={postProduct} style={style.button}>
					<Text
						style={{
							color: '#7A59C5',
							fontWeight: 'bold',
							fontSize: 14,
							textAlign: 'center',
						}}
					>
						POSTAR PRODUTO
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
