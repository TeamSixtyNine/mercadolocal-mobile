import React from 'react';
import client from '../../client';
import { Text, View, ActivityIndicator } from 'react-native';
import { parse, build, omit, keep } from 'search-params';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import style from './style';

export default function mlAuthToken({ route, navigation }) {
	// const navigation = useNavigation();

	const storeData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (e) {
			console.error(e);
		}
	};

	function navigateToHomePage() {
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
