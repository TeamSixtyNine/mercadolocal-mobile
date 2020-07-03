import React, { useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

import style from './style';

export default function mlAuth({ route, navigation }) {
	// const navigation = useNavigation();
	const { redirectURL } = route.params;
	const [webViewURI, setWebViewURI] = useState(redirectURL);

	return (
		<View style={style.container}>
			<WebView
				source={{ uri: `${redirectURL}` }}
				onError={(syntheticEvent) => {
					const { nativeEvent } = syntheticEvent;
					navigation.navigate('mlAuthToken', {
						codeURL: nativeEvent.url,
					});
				}}
			/>
		</View>
	);
}
