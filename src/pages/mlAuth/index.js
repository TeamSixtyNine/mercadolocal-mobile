import React, { useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';

import style from './style';

export default function mlAuth({ route, navigation }) {
	const { redirectURL } = route.params;
	const [webViewURI, setWebViewURI] = useState(redirectURL);

	function _onShouldStartLoadWithRequest(e) {
		if (e.url) {
			if (
				e.url.includes('https://auth.mercadolivre.com.br') ||
				e.url.includes('https://auth.mercadolibre.com') ||
				e.url.includes('https://www.mercadolivre.com')
			) {
				return true;
			} else if (e.url.includes('http://localhost:5000/?code=')) {
				navigation.navigate('mlAuthToken', {
					codeURL: e.url,
				});
				return false;
			}

			return false;
		}

		return true;
	}

	return (
		<View style={style.container}>
			<WebView
				source={{ uri: `${webViewURI}` }}
				onShouldStartLoadWithRequest={_onShouldStartLoadWithRequest}
			/>
		</View>
	);
}
