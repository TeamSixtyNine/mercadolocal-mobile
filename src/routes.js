import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Welcome from './pages/welcome';
import PaginaPrincipal from './pages/paginaPrincipal';
import autenticacao from './pages/autenticacao';
import resultadoDePesquisa from './pages/resultadoDePesquisa';
import mlAuth from './pages/mlAuth';
import mlAuthToken from './pages/mlAuthToken';
import criarProduto from './pages/criarProduto';
import comprarProduto from './pages/comprarProduto';
import verProduto from './pages/verProduto';
import lerQrCode from './pages/lerQrCode';
import confirmProduct from './pages/confirmProduct';
import verPerfil from './pages/verPerfil';
import verProdutosAVenda from './pages/verProdutosAVenda';
import chatList from './pages/chatList';
import listaDeEspera from './pages/listaDeEspera';
import afterCheckout from './pages/afterCheckout';
import gerarQRCode from './pages/gerarQRCode'

export default function Routes() {
	return (
		<NavigationContainer>
			<AppStack.Navigator screenOptions={{ headerShown: false }}>
				<AppStack.Screen name="welcome" component={Welcome} />
				<AppStack.Screen name="autenticacao" component={autenticacao} />
				<AppStack.Screen
					name="paginaPrincipal"
					component={PaginaPrincipal}
				/>
				<AppStack.Screen
					name="resultadoDePesquisa"
					component={resultadoDePesquisa}
				/>
				<AppStack.Screen name="mlAuth" component={mlAuth} />
				<AppStack.Screen name="mlAuthToken" component={mlAuthToken} />
				<AppStack.Screen name="criarProduto" component={criarProduto} />
				<AppStack.Screen
					name="comprarProduto"
					component={comprarProduto}
				/>
				<AppStack.Screen name="verProduto" component={verProduto} />
				<AppStack.Screen name="lerQrCode" component={lerQrCode} />
				<AppStack.Screen
					name="confirmProduct"
					component={confirmProduct}
				/>
				<AppStack.Screen name="verPerfil" component={verPerfil} />
				<AppStack.Screen
					name="verProdutosAVenda"
					component={verProdutosAVenda}
				/>
				<AppStack.Screen name="chatList" component={chatList} />
				<AppStack.Screen
					name="listaDeEspera"
					component={listaDeEspera}
				/>
				<AppStack.Screen
					name="afterCheckout"
					component={afterCheckout}
				/>
				<AppStack.Screen
					name="gerarQRCode"
					component={gerarQRCode}
				/>
			</AppStack.Navigator>
		</NavigationContainer>
	);
}
