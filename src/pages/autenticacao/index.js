import React from 'react';
import client from '../../client';
import { View, TextInput, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

import style from './style';

export default function autenticacao() {
	const navigation = useNavigation();

	async function authenticate() {
		const response = await client.post('/login');
		const { authURL } = response.data;

		if (authURL) {
			navigation.navigate('mlAuth', { redirectURL: authURL });
		} else {
			alert('Authentication failed.');
		}
	}

	return (
		<View style={style.container}>
			<Button
				onPress={authenticate}
				title="Autenticar-se"
				color="#841584"
				accessibilityLabel="Clique aqui para se autenticar"
			/>
		</View>
	);
}
