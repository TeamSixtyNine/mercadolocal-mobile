import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';

import style from './style';
import logoImg from '../../../assets/icon.png';

export default function welcome() {
	let [fontsLoaded] = useFonts({
		Inter_500Medium,
	});

	const navigation = useNavigation();

	function navigationToAutenticacao(welcome) {
		navigation.navigate('autenticacao');
	}

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<View style={style.container}>
				<View style={style.viewIMG}>
					<Image style={style.image} source={logoImg} />
				</View>
				<View style={style.viewMSG}>
					<Text
						style={{
							fontFamily: 'Inter_500Medium',
							fontSize: 28,
							color: '#fff',
							textAlign: 'center',
							marginTop: 32,
						}}
					>
						Bem-vindo ao Mercado Local
					</Text>
				</View>
				<View style={style.viewBTN}>
					<TouchableOpacity
						style={style.btn}
						onPress={() => navigationToAutenticacao(welcome)}
					>
						<Feather
							name="chevron-right"
							size={32}
							color="#7A59C5"
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
