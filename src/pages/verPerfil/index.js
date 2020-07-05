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
import profile from '../../assets/profile.png'
import axios from 'axios';

export default function verPerfil() {
	let [fontsLoaded] = useFonts({
		Inter_500Medium,
    });
    const [user, setUser] = useState({address: {}})

    const navigation = useNavigation()

	async function loadPerfil(){
		const access_token = await AsyncStorage.getItem('auth');
		const response = await axios.get(
			`https://api.mercadolibre.com/users/me?access_token=${access_token.split('"')[1]}`
		);
        setUser(response.data)
	}

    function verProdutosAVenda(verPerfil){
        navigation.navigate('verProdutosAVenda', verPerfil)
    }

	useEffect(() => {
		loadPerfil()
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
                <View style={style.divBtns}>
                    <TouchableOpacity
                        onPress={() => verProdutosAVenda(verPerfil)}
                        style={style.button}
                    >
                        <Text style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 14}}
                        >
                            PRODUTOS A VENDA
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={style.divInfo}>
                    <Text style={style.txt}>E-mail</Text>
                    <Text style={style.txtInfo}>{user.email}</Text>
                    <Text style={style.txt}>Localização</Text>
                    <Text 
                        style={style.txtInfo}
                    >
                        {user.address.address}, {user.address.city}, {user.address.state}
                    </Text>
                    <Text style={style.txt}>Avaliações</Text>
                    <Text style={style.txtInfo}>4.5</Text>
                    <Text style={style.txt}>EXP</Text>
                    <Text style={style.txtInfo}>110</Text>                   
                </View>
			</View>
		);
	}
}
