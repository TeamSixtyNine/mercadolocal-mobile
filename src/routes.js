import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Welcome from './pages/welcome';
import PaginaPrincipal from './pages/paginaPrincipal';
import autenticacao from './pages/autenticacao';
import mlAuth from './pages/mlAuth';
import mlAuthToken from './pages/mlAuthToken';

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
				<AppStack.Screen name="mlAuth" component={mlAuth} />
				<AppStack.Screen name="mlAuthToken" component={mlAuthToken} />
			</AppStack.Navigator>
		</NavigationContainer>
	);
}
