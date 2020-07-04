import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	FlatList,
	TouchableOpacity,
	Picker,
	DrawerLayoutAndroid,
} from 'react-native';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import style from './style';
import logoImg from '../../../assets/icon.png';

import client from '../../client';

export default function paginaPrincipal() {
	let [fontsLoaded] = useFonts({
		Inter_500Medium,
	});
	const [valorSelecionado, setValorSelecionado] = useState('');
	const [anuncios, setAnuncios] = useState([]);
	const [search, setSearch] = useState('');
	const [drawerPosition, setDrawerPosition] = useState('right');

	const navigation = useNavigation();

	/*    function changeDrawerPosition() {
        if(drawerPosition == 'right'){
            setDrawerPosition('left')
        }else{
            setDrawerPosition('right')
        }
    }*/
	const navigationView = (
		<View
			style={{
				flex: 1,
				alignItems: 'flex-start',
				paddingTop: 50,
				backgroundColor: '#fff',
				padding: 8,
			}}
		>
			<TouchableOpacity onPress={() => criarProduto(paginaPrincipal)}>
				<Text style={style.txtNavigator}>CRIAR PRODUTO</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => welcome(paginaPrincipal)}>
				<Text style={style.txtNavigator}>FAZER LOGOUT</Text>
			</TouchableOpacity>
		</View>
	);

	// CARREGAR PRODUTOS
	async function loadLocation() {
		const access_token = await AsyncStorage.getItem('auth');
		const location = await client.get('/getLocation', {
			headers: {
				Authorization: access_token.split('"')[1],
			},
		});

		return location;
	}
	async function loadAnuncios(categoria) {
		const locationCode = loadLocation();

		const response = await axios.get(
			`https://api.mercadolibre.com/sites/MLB/search?category=${categoria}&state=${locationCode}&limit=10`
		);
		setAnuncios(response.data.results);
	}

	//NAVEGAÇÃO
	async function resultadoDePesquisa(paginaPrincipal) {
		if (search == '') {
			alert('Entrada vazia');
		} else {
			await AsyncStorage.setItem('searching', search);
			navigation.navigate('resultadoDePesquisa', { paginaPrincipal });
		}
	}
	function criarProduto(paginaPrincipal) {
		navigation.navigate('criarProduto', { paginaPrincipal });
	}
	async function welcome(paginaPrincipal) {
		await AsyncStorage.setItem('auth', '');
		navigation.navigate('welcome', { paginaPrincipal });
	}
	function comprarProduto(paginaPrincipal) {
		navigation.navigate('comprarProduto', { paginaPrincipal });
	}
	async function verProduto(paginaPrincipal, id_product) {
		await AsyncStorage.setItem('id_product', id_product);
		navigation.navigate('verProduto', { paginaPrincipal });
	}
	function verPerfil(paginaPrincipal) {
		navigation.navigate('verPerfil', paginaPrincipal);
	}

	function chatList(paginaPrincipal) {
		navigation.navigate('chatList');
	}

	useEffect(() => {
		loadAnuncios(valorSelecionado);
	}, [valorSelecionado]);

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<DrawerLayoutAndroid
				drawerWidth={300}
				drawerPosition={drawerPosition}
				renderNavigationView={() => navigationView}
			>
				<View style={style.container}>
					<View style={style.header}>
						<Image style={style.image} source={logoImg} />
						<View style={style.input}>
							<TextInput
								placeholder="Buscar produtos"
								value={search}
								onChangeText={(text) => setSearch(text)}
							/>
							<Feather
								name="search"
								size={24}
								color="#000"
								onPress={() =>
									resultadoDePesquisa(paginaPrincipal)
								}
							/>
						</View>
						<Feather name="chevrons-left" size={32} color="#fff" />
					</View>
					<View style={style.divBtns}>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'flex-start',
							}}
						>
							<TouchableOpacity
								onPress={() => comprarProduto(paginaPrincipal)}
								style={style.divBtn}
							>
								<Feather
									name="credit-card"
									size={20}
									color="#fff"
								/>
							</TouchableOpacity>
							<Text style={style.txtBtn}>Ler QRCode</Text>
						</View>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'flex-start',
							}}
						>
							<TouchableOpacity
								onPress={() => {}}
								style={style.divBtn}
							>
								<Feather
									name="shopping-bag"
									size={20}
									color="#fff"
								/>
							</TouchableOpacity>
							<Text style={style.txtBtn}>Lista de espera</Text>
						</View>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'flex-start',
							}}
						>
							<TouchableOpacity
								onPress={() => {
									chatList(paginaPrincipal);
								}}
								style={style.divBtn}
							>
								<Feather
									name="message-circle"
									size={20}
									color="#fff"
								/>
							</TouchableOpacity>
							<Text style={style.txtBtn}>Chat</Text>
						</View>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'flex-start',
							}}
						>
							<TouchableOpacity
								onPress={() => verPerfil(paginaPrincipal)}
								style={style.divBtn}
							>
								<Feather name="user" size={20} color="#fff" />
							</TouchableOpacity>
							<Text style={style.txtBtn}>Ver perfil</Text>
						</View>
					</View>
					<Picker
						selectedValue={valorSelecionado}
						onValueChange={(itemValue) =>
							setValorSelecionado(itemValue)
						}
					>
						<Picker.Item label="SELECIONE UMA CATEGORIA" value="" />
						<Picker.Item
							label="Acessórios de Veículos"
							value="MLB5672"
						/>
						<Picker.Item label="Agro" value="MLB271599" />
						<Picker.Item
							label="Alimentos e Bebidas"
							value="MLB1403"
						/>
						<Picker.Item label="Animais" value="MLB1071" />
						<Picker.Item
							label="Antiguidades e coleções"
							value="MLB1367"
						/>
						<Picker.Item
							label="Arte, Papelaria e Armarinho"
							value="MLB1368"
						/>
						<Picker.Item label="Bebês" value="MLB1384" />
						<Picker.Item
							label="Beleza e Cuidado Pessoal"
							value="MLB1246"
						/>
						<Picker.Item
							label="Brinquedos e Hobbies"
							value="MLB1132"
						/>
						<Picker.Item
							label="Calçados, Roupas e Bolsas"
							value="MLB1430"
						/>
						<Picker.Item
							label="Câmeras e Acessórios"
							value="MLB1039"
						/>
						<Picker.Item
							label="Carros, Motos e Outros"
							value="MLB1743"
						/>
						<Picker.Item
							label="Casa, Móveis e Decoração"
							value="MLB1574"
						/>
						<Picker.Item
							label="Celulares e Telefones"
							value="MLB1051"
						/>
						<Picker.Item label="Eletrodomésticos" value="MLB5726" />
						<Picker.Item
							label="Eletrônico, Áudio e Vídeo"
							value="MLB1000"
						/>
						<Picker.Item
							label="Esportes e Fitness"
							value="MLB1276"
						/>
						<Picker.Item
							label="Ferramentas e Construção"
							value="MLB263532"
						/>
						<Picker.Item
							label="Festas e Lembrancinhas"
							value="MLB12404"
						/>
						<Picker.Item label="Games" value="MLB1144" />
						<Picker.Item label="Imóveis" value="MLB1459" />
						<Picker.Item
							label="Indústria e Comércio"
							value="MLB1499"
						/>
						<Picker.Item label="Informática" value="MLB1648" />
						<Picker.Item label="Ingressos" value="MLB218519" />
						<Picker.Item
							label="Instrumentos Musicais"
							value="MLB1182"
						/>
						<Picker.Item label="Joias e Relógios" value="MLB3937" />
						<Picker.Item
							label="Livros, Revistas e Comics"
							value="MLB1196"
						/>
						<Picker.Item
							label="Música, Filmes e Seriados"
							value="MLB1168"
						/>
						<Picker.Item label="Saúde" value="MLB264586" />
						<Picker.Item label="Serviços" value="MLB1540" />
					</Picker>
					<FlatList
						data={anuncios}
						style={style.anuncios}
						keyExtractor={(anuncio) => String(anuncio.id)}
						showsVerticalScrollIndicator={false}
						renderItem={({ item: anuncio }) => (
							<View style={style.anuncio}>
								<Image
									source={{ uri: anuncio.thumbnail }}
									style={style.imageAnuncio}
								/>
								<Text
									style={{
										fontFamily: 'Inter_500Medium',
										fontSize: 18,
										color: '#000',
										marginHorizontal: 12,
										marginVertical: 12,
									}}
								>
									{anuncio.title}
								</Text>
								<View style={style.txtInfo}>
									<Text>Cidade: </Text>
									<Text style={{ fontWeight: 'bold' }}>
										{anuncio.address.city_name}
									</Text>
								</View>
								<View style={style.txtInfo}>
									<Text>Preço: </Text>
									<Text style={{ fontWeight: 'bold' }}>
										R$ {anuncio.price}
									</Text>
								</View>
								<TouchableOpacity
									onPress={() =>
										verProduto(paginaPrincipal, anuncio.id)
									}
									style={style.button}
								>
									<Text
										style={{
											color: '#fff',
											fontWeight: 'bold',
											fontSize: 16,
										}}
									>
										VER PRODUTO
									</Text>
								</TouchableOpacity>
							</View>
						)}
					/>
				</View>
			</DrawerLayoutAndroid>
		);
	}
}
