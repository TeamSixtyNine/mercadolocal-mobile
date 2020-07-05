import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity,
	ScrollView,
	Linking
} from 'react-native';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-community/async-storage';

import style from './style';
import logoImg from '../../../assets/icon.png';
import axios from 'axios';

import client from '../../client'

export default function verProduto() {
	let [fontsLoaded] = useFonts({
		Inter_500Medium,
	});
	const [search, setSearch] = useState('')
	const [produto, setProduto] = useState({
		pictures:[{secure_url: ''}],
		seller_address:{
			city: ''
		}
	})
	const [extras, setExtras] = useState({})
	const [aux, setAux] = useState(0)

	async function resultadoDePesquisa(verProduto) {
        if(search == ''){
            alert('Entrada vazia')
        }else{
            await AsyncStorage.setItem('searching', search)
            navigation.navigate('resultadoDePesquisa', {verProduto});
        }
	}

	async function loadProduto(){
		const id_product = await AsyncStorage.getItem('id_product');

		const response = await axios.get(
			`https://api.mercadolibre.com/items/${id_product}`
		);
		setProduto(response.data);

		const dados = {
			id_product: id_product
		}
		const verify = await client.post('/verify', dados)
		let retiradaLocal = ''
		let troca = ''
		if(verify.data.retiradaLocal){
			retiradaLocal = 'Sim'
		}else{
			retiradaLocal = 'Não'
		}
		if(verify.data.troca){
			troca = 'Sim'
		}else{
			troca = 'Não'
		}
		setExtras({
			retiradaLocal: retiradaLocal,
			troca: troca
		})
	}

	async function changeAux(direction){
		
		if(direction == 'L'){
			if(aux > 0){
				setAux(aux-1)
			}else if(aux == 0){
				setAux(Number(produto.pictures.length-1))
			}
		}else{
			if(aux < produto.pictures.length-1){
				setAux(aux+1)
			}else if(aux == produto.pictures.length-1){
				setAux(0)
			}
		}
	}

	async function loadPerfil(){
		const access_token = await AsyncStorage.getItem('auth');
		const response = await axios.get(
			`https://api.mercadolibre.com/users/me?access_token=${access_token.split('"')[1]}`
		);
        return response.data.id
	}
	async function analisarProduto(id, link, seller_id, retiradaLocal, troca){
		const user_id = await loadPerfil()
		if(seller_id == user_id){
			alert('Não é possível comprar seu próprio produto anunciado')
		}else{
			if(retiradaLocal == 'Sim' || troca == 'Sim'){
				const access_token = await AsyncStorage.getItem('auth');
				const data = {
					id_product: id
				}
				try{
					alert('Produto adicionado a lista de espera do vendedor!')
					await client.post('/addProductList', data, {
						headers: {
							Authorization: access_token.split('"')[1],
						},
					})
				}catch(err){
					console.error(err)
				}
			}else{
				Linking.openURL(`${link}`)
			}
		}
	}

	function chatList(verProduto){
		
	}

	useEffect(() => {
		loadProduto()
	}, [])
	if (!fontsLoaded) {
		return <AppLoading />
	} else {
		return (
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
                            onPress={() => resultadoDePesquisa(verProduto)}
                        />
                    </View>
                    <Feather 
                        name="chevrons-left"
                        size={32} 
                        color="#fff"
                    />
                </View>
				<ScrollView>
					<View style={style.divProduto}>
						<Text style={{
							color: '#000',
							fontFamily: 'Inter_500Medium',
							fontSize: 20,
							marginHorizontal: 20,
							marginTop: 12
						}}>
							{produto.title}
						</Text>
						<View style={{
							flexDirection: 'row',
							alignItems: 'center'
						}}>
							<Feather
								style={style.btnImg}
								name="chevron-left"
								size={32} 
								color="#000"
								onPress={() => changeAux('L')}
							/>
							<Image source={{uri: produto.pictures[aux].secure_url}} style={style.img} />
							<Feather
								style={style.btnImg}
								name="chevron-right"
								size={32} 
								color="#000"
								onPress={() => changeAux('R')}
							/>
						</View>
						<View style={{flexDirection: 'column'}}>
							<Text style={style.txt}>Preço</Text>
							<Text style={style.txtInfo}>R$ {produto.price}</Text>
							
							<Text style={{fontSize: 16, marginTop: 24}}>Pagamento no momento da entrega</Text>
							<Text style={style.txtInfo}>{extras.retiradaLocal}</Text>
							<Text style={style.txt}>Possibilidade de troca</Text>
							<Text style={style.txtInfo}>{extras.troca}</Text>
							
							<View style={style.divBtns}>
								<View
									style={{
										alignItems: 'center',
										justifyContent: 'flex-start',
									}}
								>
									<TouchableOpacity
										onPress={() => analisarProduto(
											produto.id,
											produto.permalink,
											produto.seller_id,
											extras.retiradaLocal,
											extras.troca
										)}
										style={style.divBtn}
									>
										<Feather
											name="shopping-cart"
											size={20}
											color="#fff"
										/>
									</TouchableOpacity>
									<Text style={style.txtBtn}>Comprar</Text>
								</View>
								<View
									style={{
										alignItems: 'center',
										justifyContent: 'flex-start',
									}}
								>
									<TouchableOpacity
										onPress={() => {
											chatList(verProduto);
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
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}
