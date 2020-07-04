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
<<<<<<< HEAD
import confirmProduct from './pages/confirmProduct';
=======
import verPerfil from './pages/verPerfil'
import verProdutosAVenda from './pages/verProdutosAVenda'
>>>>>>> 6fa7dc4c64eca556e85358d12196412cd7ae86a9

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
<<<<<<< HEAD
				<AppStack.Screen
					name="confirmProduct"
					component={confirmProduct}
				/>
=======
				<AppStack.Screen name="verPerfil" component={verPerfil} />
				<AppStack.Screen name="verProdutosAVenda" component={verProdutosAVenda} />
>>>>>>> 6fa7dc4c64eca556e85358d12196412cd7ae86a9
			</AppStack.Navigator>
		</NavigationContainer>
	);
}
