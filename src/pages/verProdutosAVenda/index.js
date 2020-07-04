import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import profile from '../../assets/profile.png'
import AsyncStorage from '@react-native-community/async-storage';

import style from './style';
import axios from 'axios';

export default function verProdutosAVenda() {
	let [fontsLoaded] = useFonts({
		Inter_500Medium,
    });
    const [user, setUser] = useState({address: {}})
    const [produtos, setProdutos] = useState([])

    const navigation = useNavigation()

    async function loadPerfilProdutos(){
		const access_token = await AsyncStorage.getItem('auth');
		const response = await axios.get(
			`https://api.mercadolibre.com/users/me?access_token=${access_token.split('"')[1]}`
		);
        setUser(response.data)

        // Usar ID 234000251 para testar exibição
        const produtosResponse = await axios.get(
			`https://api.mercadolibre.com/sites/MLB/search?seller_id=${response.data.id}`
		);
        setProdutos(produtosResponse.data.results)
    }
    
    async function verProduto(verProdutosAVenda, id_product){
        await AsyncStorage.setItem('id_product', id_product)
        navigation.navigate('verProduto', {verProdutosAVenda})
    }

	useEffect(() => {
        loadPerfilProdutos()
	}, [])
	if (!fontsLoaded) {
		return <AppLoading />
	} else {
		return (
			<View style={style.container}>
                <View style={style.header}>
                    <Image source ={profile} style={style.imgProfile} />
                    <View style={{marginHorizontal: 12, marginVertical: 12}}>
                        <Text style={style.txtHeader0}>Nome do usuário</Text>
                        <Text style={style.txtHeader1}>{user.first_name} {user.last_name}</Text>
                        <Text style={style.txtHeader0}>Nickname</Text>
                        <Text style={style.txtHeader2}>{user.nickname}</Text>
                    </View>
                </View>
                <FlatList
                    data={produtos}
                    style={style.produtos}
                    keyExtractor={(produto) => String(produto.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: produto }) => (
                        <View style={style.produto}>
                            <Image
                                source={{ uri: produto.thumbnail }}
                                style={style.imageProduto}
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
                                {produto.title}
                            </Text>
                            <View style={style.txtInfo}>
                                <Text>Cidade: </Text>
                                <Text style={{fontWeight: 'bold'}}>{produto.address.city_name}</Text>
                            </View>
                            <View style={style.txtInfo}>
                                <Text>Preço: </Text>
                                <Text style={{fontWeight: 'bold'}}>R$ {produto.price}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => verProduto(verProdutosAVenda, produto.id)}
                                style={style.button}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 16}}
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