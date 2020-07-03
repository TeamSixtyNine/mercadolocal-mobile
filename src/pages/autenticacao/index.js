import React from 'react';
import client from '../../client';
import { View, TextInput, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import style from './style';

export default function autenticacao() {
	async function authenticate() {
		const response = await client.post('/login');
		console.log(response.data.authURL);
	}

	return (
		<View style={style.container}>
			<Text>Email</Text>
			<TextInput
				style={{ height: 40, borderColor: 'white', borderWidth: 1 }}
			/>
			<Text>Senha</Text>
			<TextInput
				style={{ height: 40, borderColor: 'white', borderWidth: 1 }}
			/>

			<Button
				onPress={authenticate}
				title="Learn More"
				color="#841584"
				accessibilityLabel="Learn more about this purple button"
			/>
		</View>
	);
}
