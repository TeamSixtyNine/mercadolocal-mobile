import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	FlatList,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import client from '../../client';

import style from './style';

export default function resultadoDePesquisa(){
    let [fontsLoaded] = useFonts({
        Inter_500Medium
    })
    const [anuncios, setAnuncios] = useState([]);
    const [anunciosDB, setAnunciosDB]= useState([])
    const [palavraPesquisada, setPalavraPesquisada] = useState('')
    const [quantResults, setQuantResults] = useState('')

    const navigation = useNavigation()


    async function loadLocation() {
		const access_token = await AsyncStorage.getItem('auth');
		const location = await client.get('/getLocation', {
			headers: {
				Authorization: access_token.split('"')[1],
			},
		});

		return location;
    }
    async function loadSearchDB(){
        const access_token = await AsyncStorage.getItem('auth');
        const searching = await AsyncStorage.getItem('searching');
        const locationCode = await loadLocation();

        const responseDB = await client.get(
            `/search/${searching.replace(/ /g, '@')}/${locationCode.data}`
        )
        let url = ''
        console.log(responseDB)

        if(responseDB.data.length != 0){
            responseDB.data.forEach((id) => {
                url += `${id},`
            })
            console.log(url)
            const result = await axios.get(
                `https://api.mercadolibre.com//items?ids=
                ${url}
                &access_token=${access_token.split('"')[1]}
                `
            )
            setAnunciosDB(result.data)
        }
    }
    async function loadSearch(){
        const searching = await AsyncStorage.getItem('searching');
        const locationCode = await loadLocation();
        
        setPalavraPesquisada(searching)
        const response = await axios.get(
            `https://api.mercadolibre.com/sites/MLB/search?q=${searching}&state=${locationCode.data}&limit=10`
        )

        setAnuncios(response.data.results)
        setQuantResults(response.data.paging.total)

        await loadSearchDB()
    }

    async function verProduto(resultadoDePesquisa, id_product){
        await AsyncStorage.setItem('id_product', id_product);
        navigation.navigate('verProduto', {resultadoDePesquisa})
    }

    useEffect(() => {
        loadSearch()
    }, [])

    if(!fontsLoaded){
        return <AppLoading />
    }else{
        return (
            <View style={style.container}>
                <View style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={style.txtResult}>{palavraPesquisada}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={style.txt}> gerou um total de</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={style.txtResult}> {quantResults}</Text>
                    <Text style={style.txt}> resultados</Text>
                </View>
                <ScrollView>
                    <FlatList
                        data={anunciosDB}
                        style={style.anuncios}
                        keyExtractor={anuncioDB => anuncioDB.body.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: anuncioDB }) => (
                            <View style={style.anuncio}>
                                <Image
                                    source={{ uri: anuncioDB.body.thumbnail }}
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
                                    {anuncioDB.body.title}
                                </Text>
                                <View style={style.txtInfo}>
                                    <Text>Preço: </Text>
                                    <Text style={{fontWeight: 'bold'}}>R$ {anuncioDB.body.price}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => verProduto(resultadoDePesquisa, anuncioDB.body.id)}
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
                                    <Text>Preço: </Text>
                                    <Text style={{fontWeight: 'bold'}}>R$ {anuncio.price}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => verProduto(resultadoDePesquisa, anuncio.id)}
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
                </ScrollView>
            </View>
        )
    }
}