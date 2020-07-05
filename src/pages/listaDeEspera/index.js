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

import client from '../../client'

import style from './style';

export default function listaDeEspera(){
    let [fontsLoaded] = useFonts({
        Inter_500Medium
    })
    const [anuncios, setAnuncios] = useState([])
    const [aux, setAux] = useState(0)

    const navigation = useNavigation()

    async function loadUserID(){
        const access_token = await AsyncStorage.getItem('auth')

        const user_id = await axios.get(
            `https://api.mercadolibre.com/users/me?access_token=${access_token.split('"')[1]}`
        )

        return user_id.data.id
    }
    async function loadAnunciosID(){
        const access_token = await AsyncStorage.getItem('auth')
        const id_user = await loadUserID()
        const data = {
            id_user: id_user
        }
        let url = ''

        const ids = await client.post('/procurarNaListaEspera', data)
        
        ids.data.forEach(id => {
            url += `${id.id},`
        })

        const result = await axios.get(
            `https://api.mercadolibre.com//items?ids=
            ${url}
            &access_token=${access_token.split('"')[1]}
            `
        )
        setAnuncios(result.data)
    }

    async function gerarQRCode(listaDeEspera, id_product){
        await AsyncStorage.setItem('id_product', id_product);
        navigation.navigate('gerarQRCode', {listaDeEspera})
    }

    useEffect(() => {
        loadAnunciosID()
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
                    <Text style={style.txtResult}>Sua lista de espera</Text>
                </View>

                <FlatList
                    data={anuncios}
                    style={style.anuncios}
                    keyExtractor={anuncio => anuncio.body.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: anuncio }) => (
                        <View style={style.anuncio}>
                            <Image
                                source={{ uri: anuncio.body.thumbnail }}
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
                                {anuncio.body.title}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {gerarQRCode(listaDeEspera, anuncio.body.id)}}
                                style={style.button}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 16}}
                                >
                                    GERAR QRCODE
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        )
    }
}