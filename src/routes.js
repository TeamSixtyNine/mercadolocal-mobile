import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const AppStack = createStackNavigator()

import Welcome from './pages/welcome'
import PaginaPrincipal from './pages/paginaPrincipal'

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="welcome" component={Welcome} />
                <AppStack.Screen name="paginaPrincipal" component={PaginaPrincipal} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}