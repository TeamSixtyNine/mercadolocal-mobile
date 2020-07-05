import React, { useState, useEffect } from 'react';
import {
	View,
	Image,
	Text
} from 'react-native';
import { AppLoading } from 'expo';
import AsyncStorage from '@react-native-community/async-storage';

import style from './style';
import logoImg from '../../../assets/icon.png';

import client from '../../client';

export default function paginaPrincipal() {
	const [base64, setBase64] = useState('')
	
	async function loadQRCode(){
		const id_product = await AsyncStorage.getItem('id_product');
		const response = await client.get(`/qr/${id_product}`)

		setBase64(`data:image/png;base64,${response.data.base64}`)
	}
	useEffect(() => {
		loadQRCode()	
	}, []);
    return (
		<View style={style.container}>
			<Text
				style={{
					fontSize: 24,
					fontWeight: 'bold',
					marginBottom: 80
				}}
			>
				QRCode gerado!
			</Text>
			<Image
				style={{
					width: 180,
					height: 180
				}}
				source={{
					uri: base64
				}}
			/>
		</View>
	);
}
