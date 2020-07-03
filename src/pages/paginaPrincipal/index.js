import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, Image, FlatList} from 'react-native'
import {AppLoading} from 'expo'
import {Feather} from '@expo/vector-icons'
import {useFonts, Inter_500Medium} from '@expo-google-fonts/inter'
import axios from 'axios'

import style from './style'

import logoImg from '../../../assets/icon.png'

export default function paginaPrincipal(){
    let [fontsLoaded] = useFonts({
        Inter_500Medium
    })
    const [categorias, setCategorias] = useState([])

    async function loadCategorias(){
        const response = await axios.get(
            'https://api.mercadolibre.com/sites/MLB/categories'
        )

        setCategorias(response.data)
    }

    useEffect(() => {
        loadCategorias()
    }, [])

    if(!fontsLoaded){
        return <AppLoading />
    }else{
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Image style={style.image} source={logoImg} />
                    <View style={style.input}>
                        <TextInput
                            placeholder="Buscar produtos"
                        />
                        <Feather name="search" size={24} color="#000" />    
                    </View>
                    <Feather name="align-justify" size={32} color="#fff" />
                </View>
                <FlatList
                    data={categorias}
                    style={style.categorias}
                    keyExtractor={categoria => String(categoria.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item: categoria}) => (
                        <View style={style.categoria}>
                            <Text style={style.txtResponse}>{categoria.name}</Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}