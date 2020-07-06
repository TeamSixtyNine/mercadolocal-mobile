import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	FlatList,
	TouchableOpacity,
	Picker,
	ScrollView
} from 'react-native';
import { AppLoading } from 'expo';
import { Feather } from '@expo/vector-icons';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import style from './style';
import logoImg from '../../../assets/icon.png';

import client from '../../client';

export default function paginaPrincipal({ route, navigation }) {
	let [fontsLoaded] = useFonts({
		Inter_500Medium,
	});
	const [valorSelecionado, setValorSelecionado] = useState('');
	const [anuncios, setAnuncios] = useState([]);
	const [search, setSearch] = useState('');
	const [drawerPosition, setDrawerPosition] = useState('right');

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
		const locationCode = await loadLocation();
		const response = await axios.get(
			`https://api.mercadolibre.com/sites/MLB/search?category=${categoria}&state=${locationCode.data}&limit=10`
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
	function lerQrCode(paginaPrincipal) {
		navigation.navigate('lerQrCode', { paginaPrincipal });
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
	function listaDeEspera(paginaPrincipal) {
		navigation.navigate('listaDeEspera', { paginaPrincipal });
	}

	useEffect(() => {
		setValorSelecionado("MLB1051")
		loadAnuncios(valorSelecionado);
	}, [valorSelecionado]);

	if (!fontsLoaded) {
		return <AppLoading />;
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
							style={{ width: 130 }}
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
				</View>
				<ScrollView
					horizontal={true}
					style={{
						height: 180,
					}}
				>
					<View style={style.divBtns}>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'flex-start',
							}}
						>
							<TouchableOpacity
								onPress={() => lerQrCode(paginaPrincipal)}
								style={style.divBtn}
							>
								<Feather
									name="command"
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
								onPress={() => listaDeEspera(paginaPrincipal)}
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
								onPress={() => criarProduto(paginaPrincipal)}
								style={style.divBtn}
							>
								<Feather
									name="plus"
									size={20}
									color="#fff"
								/>
							</TouchableOpacity>
							<Text style={style.txtBtn}>Criar anúncio</Text>
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
									name="user-plus"
									size={20}
									color="#fff"
								/>
							</TouchableOpacity>
							<Text style={style.txtBtn}>Ver amigos</Text>
						</View>
					</View>
				</ScrollView>
				<Picker
					selectedValue={valorSelecionado}
					onValueChange={(itemValue) =>
						setValorSelecionado(itemValue)
					}
				>
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
		);
	}
}
