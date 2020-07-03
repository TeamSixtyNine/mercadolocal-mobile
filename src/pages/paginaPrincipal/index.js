import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, Image, FlatList, TouchableOpacity} from 'react-native'
import {AppLoading} from 'expo'
import {useNavigation} from '@react-navigation/native'
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

    const navigation = useNavigation()

    async function loadCategorias(){
        const response = await axios.get(
            'https://api.mercadolibre.com/sites/MLB/categories'
        )

        setCategorias(response.data)
    }

    function resultadoDePesquisa(paginaPrincipal){
        navigation.navigate('resultadoDePesquisa', {paginaPrincipal})
    }

    function criarProduto(paginaPrincipal){
        navigation.navigate('criarProduto', {paginaPrincipal})
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
                        <Feather
                            name="search"
                            size={24}
                            color="#000"
                            onPress={() => resultadoDePesquisa(paginaPrincipal)}
                        />    
                    </View>
                    <Feather name="align-justify" size={32} color="#fff" />
                </View>
                <TouchableOpacity
                        onPress={() => criarProduto(paginaPrincipal)}
                    >
                        <Text>IR PARA CRIAR PRODUTO</Text>
                    </TouchableOpacity>
                <FlatList
                    data={categorias}
                    style={style.categorias}
                    keyExtractor={categoria => String(categoria.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item: categoria}) => (
                        <View style={style.categoria}>
                            <Text
                                style={{
                                    fontFamily: 'Inter_500Medium',
                                    fontSize: 18,
                                    color: '#000'
                                }} 
                                onPress={() => resultadoDePesquisa(paginaPrincipal)}>{categoria.name}
                            </Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}