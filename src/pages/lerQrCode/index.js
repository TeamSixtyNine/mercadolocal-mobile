import React, { useState, useEffect } from 'react';
import style from './style';
import { View, Text, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet } from 'react-native';
import client from '../../client';
import Spinner from 'react-native-loading-spinner-overlay';

export default function lerQrCode({ navigation }) {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [spinner, setSpinner] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const getProductInfo = async (id) => {
		try {
			const response = await client.post(`/preview/${id}`);
			return response;
		} catch (err) {
			console.error('Could not get product info. Error: ', err);
		}
	};

	function navigateToConfirmProduct(info) {
		console.log(info);
		navigation.navigate('confirmProduct', { productInfo: info });
	}

	const handleBarCodeScanned = async ({ type, data }) => {
		setScanned(true);
		if (data) {
			const productInfo = await getProductInfo(data);
			if (productInfo.data) {
				navigateToConfirmProduct(productInfo.data);
			}

			// navigateToComprarProduto(data);
		} else {
			// TODO: check if QR Code really redirects to MP checkout
			alert('QR Code não reconhecido');
		}
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'flex-end',
			}}
		>
			<Spinner
				visible={spinner}
				textContent={'Loading...'}
				textStyle={styles.spinnerTextStyle}
			/>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>

			{scanned && (
				<Button
					title={'Tap to Scan Again'}
					onPress={() => setScanned(false)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	spinnerTextStyle: {
		color: '#FFF',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
