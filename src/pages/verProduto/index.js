import React from 'react';
import {
	View,
	Text
} from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';

export default function paginaPrincipal() {
	let [fontsLoaded] = useFonts({
		Inter_500Medium,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<View>
                <Text>VER PRODUTO</Text>
			</View>
		);
	}
}
