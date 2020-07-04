import React, { useState } from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

import style from './style';

export default function comprarProduto({ route }) {
	const [state, setState] = useState(false);

	const { productURL, test } = route.params;
	console.log(productURL, test);

	const navigation = useNavigation();

	function navigateToReadQRCode() {
		navigation.navigate('lerQrCode');
	}

	if (productURL) {
		return (
			<View style={style.webview}>
				<WebView
					source={{
						uri: productURL,
					}}
				/>
			</View>
		);
	} else if (!state) {
		return (
			<View style={style.container}>
				<Text
					style={{ color: 'blue' }}
					onPress={() => setState(!state)}
				>
					Clique aqui para comprar
				</Text>

				<Button
					onPress={navigateToReadQRCode}
					title="Ler QR Code"
					color="#841584"
					accessibilityLabel="Clique aqui para ler QR Code"
					style={style.postBtn}
				/>
			</View>
		);
	} else {
		return (
			<View style={style.webview}>
				<WebView
					source={{
						uri:
							'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=600392236-cba7dfb6-16b4-442f-84d5-870b65d60a09',
					}}
				/>
			</View>
		);
	}
}
