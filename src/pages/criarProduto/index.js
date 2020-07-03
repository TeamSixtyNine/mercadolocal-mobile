import React from 'react'
import {View, Text} from 'react-native'
import {AppLoading} from 'expo'
import {useNavigation} from '@react-navigation/native'
import {useFonts, Inter_500Medium} from '@expo-google-fonts/inter'
import axios from 'axios'

import style from './style'

import logoImg from '../../../assets/icon.png'

export default function paginaPrincipal(){
    let [fontsLoaded] = useFonts({
        Inter_500Medium
    })

    if(!fontsLoaded){
        return <AppLoading />
    }else{
        return (
            <View >
                <Text>Criar produto</Text>
            </View>
        )
    }
}