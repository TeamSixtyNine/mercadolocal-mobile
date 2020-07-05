import React from 'react';
import client from '../../client';
import { Text, View, ActivityIndicator } from 'react-native';
import { parse, build, omit, keep } from 'search-params';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import style from './style';

export default function mlAuthToken({ route, navigation }) {
	const storeData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (e) {
			console.error(e);
		}
	};

	async function loadPerfil() {
		const access_token = await AsyncStorage.getItem('auth');
		const response = await axios.get(
			`https://api.mercadolibre.com/users/me?access_token=${
				access_token.split('"')[1]
			}`
		);
		return response.data.id;
	}
	async function checkUser() {
		const access_token = await AsyncStorage.getItem('auth');
		const id_user = await loadPerfil();
		console.log(id_user);
		const data = {
			id: id_user,
		};
		await client.post('/checkUser', data, {
			headers: {
				Authorization: access_token.split('"')[1],
			},
		});
	}
	function navigateToHomePage() {
		checkUser();
		navigation.navigate('paginaPrincipal');
	}

	(async () => {
		const { codeURL } = route.params;
		const { code } = parse(codeURL);

		try {
			const response = await client.post('/auth', { code });
			if (response.status === 200) {
				const test = JSON.stringify(response.data.access_token);
				storeData('auth', test);

				navigateToHomePage();
			} else {
				console.log('User not authorized.');
			}
		} catch (err) {
			console.error(err);
		}
	})();

	return (
		<View style={style.container}>
			<Text style={style.authenticating}>Autenticando usuário</Text>
			<ActivityIndicator size="large" color="#fff" />
		</View>
	);
}
