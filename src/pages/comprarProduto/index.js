import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

import style from './style';

export default function comprarProduto() {
	const [state, setState] = useState(false);
	if (!state) {
		return (
			<View style={style.container}>
				<Text
					style={{ color: 'blue' }}
					onPress={() => setState(!state)}
				>
					Clique aqui para comprar
				</Text>
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
