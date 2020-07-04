import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	FlatList,
	TouchableOpacity
} from 'react-native';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import style from './style';

export default function resultadoDePesquisa(){
    let [fontsLoaded] = useFonts({
        Inter_500Medium
    })
    const [anuncios, setAnuncios] = useState([]);
    const [palavraPesquisada, setPalavraPesquisada] = useState('')
    const [quantResults, setQuantResults] = useState('')

    const navigation = useNavigation()

    async function loadSearch(){
        const searching = await AsyncStorage.getItem('searching');
        setPalavraPesquisada(searching)

        const response = await axios.get(
            `https://api.mercadolibre.com/sites/MLB/search?q=${searching}&limit=10`
        )
        setAnuncios(response.data.results)
        setQuantResults(response.data.paging.total)
    }

    function verProduto(resultadoDePesquisa){
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
                                onPress={() => loadAnuncios(anuncio.id)}
                            >
                                {anuncio.title}
                            </Text>
                            <View style={style.txtInfo}>
                                <Text>Cidade: </Text>
                                <Text style={{fontWeight: 'bold'}}>{anuncio.address.city_name}</Text>
                            </View>
                            <View style={style.txtInfo}>
                                <Text>Preço: </Text>
                                <Text style={{fontWeight: 'bold'}}>R$ {anuncio.price}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => verProduto(resultadoDePesquisa)}
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
        )
    }
}