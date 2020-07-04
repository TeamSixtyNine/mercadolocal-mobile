import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity
} from 'react-native';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-community/async-storage';

import style from './style';
import logoImg from '../../../assets/icon.png';
import axios from 'axios';

export default function verProduto() {
	let [fontsLoaded] = useFonts({
		Inter_500Medium,
	});
	const [search, setSearch] = useState('')
	const [produto, setProduto] = useState({
		pictures:[{secure_url: ''}]
	})
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
	}

	function changeAux(direction){
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
					<View style={{
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
					}}>
						<Text style={style.txt}>Preço</Text>
						<Text style={style.txtInfo}>R$ {produto.price}</Text>
						<Text style={style.txt}>Cidade</Text>
						<Text style={style.txtInfo}>{produto.seller_address.city.name}</Text>
						<TouchableOpacity
                            style={style.button}
                        >
                            <Text style={{
                                color: '#fff',
                                fontSize: 16}}
                            >
                                COMPRAR
                            </Text>
                        </TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
