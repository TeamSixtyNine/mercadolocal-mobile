import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, Image, FlatList, TouchableOpacity, Picker} from 'react-native'
import {AppLoading} from 'expo'
import {useNavigation} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'
import {useFonts, Inter_500Medium} from '@expo-google-fonts/inter'
import AsyncStorage from '@react-native-community/async-storage';

import style from './style'
import logoImg from '../../../assets/icon.png'

import client from '../../client'

export default function paginaPrincipal(){
    let [fontsLoaded] = useFonts({
        Inter_500Medium
    })
    const [valorSelecionado, setValorSelecionado] = useState('')
    const [anuncios, setAnuncios] = useState([])

    const navigation = useNavigation()
    
    
    // CARREGAR PRODUTOS
    async function loadLocation(){
        const access_token = await AsyncStorage.getItem('auth')
        const location = await client.get('/getLocation', {
            headers: {
                Authorization: access_token.split('"')[1]
            }
        })

        return location
    }
    async function loadAnuncios(categoria){
        const locationCode = loadLocation()

        const response = await client.get(
            `https://api.mercadolibre.com/sites/MLB/search?category=${categoria}&state=${locationCode}&limit=10`
        )
        console.log(response.data.results[0].thumbnail)
        setAnuncios(response.data.results)
    }

    //NAVEGAÇÃO
    function resultadoDePesquisa(paginaPrincipal){
        navigation.navigate('resultadoDePesquisa', {paginaPrincipal})
    }

    function criarProduto(paginaPrincipal){
        navigation.navigate('criarProduto', {paginaPrincipal})
    }

    useEffect(() => {
        loadAnuncios(valorSelecionado)
    }, [valorSelecionado])

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
                <Picker
                    selectedValue={valorSelecionado}
                    onValueChange={(itemValue) => setValorSelecionado(itemValue)}
                >
                    <Picker.Item label="SELECIONE UMA CATEGORIA" value="" />
                    <Picker.Item label="Acessórios de Veículos" value="MLB5672" />
                    <Picker.Item label="Agro" value="MLB271599" />
                    <Picker.Item label="Alimentos e Bebidas" value="MLB1403" />
                    <Picker.Item label="Animais" value="MLB1071" />
                    <Picker.Item label="Antiguidades e coleções" value="MLB1367" />
                    <Picker.Item label="Arte, Papelaria e Armarinho" value="MLB1368" />
                    <Picker.Item label="Bebês" value="MLB1384" />
                    <Picker.Item label="Beleza e Cuidado Pessoal" value="MLB1246" />
                    <Picker.Item label="Brinquedos e Hobbies" value="MLB1132" />
                    <Picker.Item label="Calçados, Roupas e Bolsas" value="MLB1430" />
                    <Picker.Item label="Câmeras e Acessórios" value="MLB1039" />
                    <Picker.Item label="Carros, Motos e Outros" value="MLB1743" />
                    <Picker.Item label="Casa, Móveis e Decoração" value="MLB1574" />
                    <Picker.Item label="Celulares e Telefones" value="MLB1051" />
                    <Picker.Item label="Eletrodomésticos" value="MLB5726" />
                    <Picker.Item label="Eletrônico, Áudio e Vídeo" value="MLB1000" />
                    <Picker.Item label="Esportes e Fitness" value="MLB1276" />
                    <Picker.Item label="Ferramentas e Construção" value="MLB263532" />
                    <Picker.Item label="Festas e Lembrancinhas" value="MLB12404" />
                    <Picker.Item label="Games" value="MLB1144" />
                    <Picker.Item label="Imóveis" value="MLB1459" />
                    <Picker.Item label="Indústria e Comércio" value="MLB1499" />
                    <Picker.Item label="Informática" value="MLB1648" />
                    <Picker.Item label="Ingressos" value="MLB218519" />
                    <Picker.Item label="Instrumentos Musicais" value="MLB1182" />
                    <Picker.Item label="Joias e Relógios" value="MLB3937" />
                    <Picker.Item label="Livros, Revistas e Comics" value="MLB1196" />
                    <Picker.Item label="Música, Filmes e Seriados" value="MLB1168" />
                    <Picker.Item label="Saúde" value="MLB264586" />
                    <Picker.Item label="Serviços" value="MLB1540" />
                </Picker>
                <FlatList
                    data={anuncios}
                    style={style.anuncios}
                    keyExtractor={anuncio => String(anuncio.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item: anuncio}) => (
                        <View style={style.anuncio}>
                            <Image source={{uri: anuncio.thumbnail}} style={style.imageAnuncio} />
                            <Text
                                style={{
                                    fontFamily: 'Inter_500Medium',
                                    fontSize: 18,
                                    color: '#000',
                                    marginHorizontal: 12,
                                    marginTop: 12,
                                }} 
                                onPress={() => loadAnuncios(anuncio.id)}
                            >
                                {anuncio.title}
                            </Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}