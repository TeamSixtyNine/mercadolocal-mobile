import React from 'react';
import { View, Text } from 'react-native';
import style from './style';

export default function afterCheckout({ route }) {
	const { productInfo } = route.params;

	return (
		<View style={style.container}>
			<Text style={style.afterCheckoutTitle}>
				Você acabou de comprar {productInfo.title}
			</Text>
		</View>
	);
}
