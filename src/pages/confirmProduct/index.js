import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import style from './style';
import client from '../../client';
// import { useNavigation } from '@react-navigation/native';

export default function confirmProduct({ route, navigation }) {
	// const navigation = useNavigation();

	const { productInfo } = route.params;

	function navigateToComprarProduto(mpCheckout) {
		navigation.navigate('comprarProduto', {
			productURL: mpCheckout,
			productInfo,
		});
	}

	async function buyProduct() {
		// alert('New buy product');
		// Make call to create MP Checkout with product ID

		const response = await client.post(`/buy/${productInfo.id}`);
		const mpCheckout = response.data.init_point;
		if (mpCheckout) {
			navigateToComprarProduto(mpCheckout);
		}
		console.log(response.data.init_point);
	}

	function navigateToMainPage() {
		navigation.navigate('paginaPrincipal');
	}

	function cancelBuying() {
		alert('Compra cancelada.');
		// Go back to main page
		navigateToMainPage();
	}

	return (
		<View style={style.container}>
			<Text style={style.confirmTitle}>Comprar produto</Text>
			<Image
				style={style.pictureStyle}
				source={{ uri: `${productInfo.pictures[0].secure_url}` }}
			/>

			<Text style={style.productTitle}>{productInfo.title}</Text>
			<Text style={style.price}>R$ {productInfo.price + 0.0}</Text>
			{/* <Text>{route.params}</Text> */}

			<View style={style.buttonContainer}>
				<TouchableHighlight
					style={style.confirmButton}
					onPress={buyProduct}
					underlayColor="#7732a8"
				>
					<Text style={style.confirmButtonText}>Confirmar</Text>
				</TouchableHighlight>
			</View>

			<View style={style.buttonContainer}>
				<TouchableHighlight
					style={style.confirmButton}
					onPress={cancelBuying}
					underlayColor="#7732a8"
				>
					<Text style={style.confirmButtonText}>Cancelar</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
}
