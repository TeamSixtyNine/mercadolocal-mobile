import React, { useState } from 'react';
import { View, Text, AsyncStorage, TouchableHighlight } from 'react-native';
import style from './style';
import axios from 'axios';
import { Rating, AirbnbRating } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

export default function afterCheckout({ route, navigation }) {
	const { productInfo } = route.params;
	const [sellerNickname, setsellerNickname] = useState('');
	(async function getSellerNickname() {
		try {
			const auth_token = await AsyncStorage.getItem('auth');
			const ML_userInfo = `https://api.mercadolibre.com/users/${
				productInfo.seller_id
			}?access_token=${auth_token.split('"')[1]}`;
			const response = await axios.get(ML_userInfo);
			setsellerNickname(response.data.nickname);
		} catch (err) {
			console.log(err);
		}
	})();

	function navigateToHomePage() {
		navigation.navigate('paginaPrincipal');
	}

	// TODO: adicionar push notification para o usuário que receber a avaliação (pontuar, receber pedido de amigo, adicionar dinheiro ao caixa)
	// TODO: pontuar também o usuário que comprou o produto

	return (
		<View style={style.container}>
			<Text style={style.afterCheckoutTitle}>Você acabou de comprar</Text>
			<Text style={style.productAttribute}>{productInfo.title}</Text>
			<Text style={style.productAttribute}>R$ {productInfo.price}</Text>
			<Text style={style.productAttribute}>De {sellerNickname}</Text>

			<View style={style.ratingContainer}>
				<Text style={style.ratingText}>
					Como você avaliaria a sua compra?
				</Text>

				<AirbnbRating
					count={5}
					reviews={['Péssimo', 'Ruim', 'Ok', 'Bom', 'Ótimo :)']}
					defaultRating={5}
					size={30}
					reviewSize={20}
					// onFinishRating={greet}
					selectedColor={'#F4F1DE'}
					reviewColor={'#F4F1DE'}
					useNativeDriver={true}
				/>
			</View>

			<View style={style.buttonContainer}>
				<View style={style.friendRequestContainer}>
					<Text style={style.friendRequest}>
						Enviar solicitação de amizade para {sellerNickname}
					</Text>
					<Feather
						style={style.frIcon}
						name="user-plus"
						size={24}
						color="#fff"
						// onPress={() => sendFriendRequest(paginaPrincipal)}
					/>
				</View>
				<TouchableHighlight
					style={style.confirmButton}
					underlayColor="#7732a8"
					onPress={() => navigateToHomePage()}
				>
					<Text style={style.confirmButtonText}>
						Voltar para a Home
					</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
}
