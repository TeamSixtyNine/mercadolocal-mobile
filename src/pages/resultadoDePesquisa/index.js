import React from 'react'
import {View, Text} from 'react-native'
import {AppLoading} from 'expo'
import {useFonts, Inter_500Medium} from '@expo-google-fonts/inter'
import axios from 'axios'

import style from './style'

export default function resultadoDePesquisa(){
    let [fontsLoaded] = useFonts({
        Inter_500Medium
    })

    if(!fontsLoaded){
        return <AppLoading />
    }else{
        return (
            <View>
                <Text
                    style={{
                        fontFamily: 'Inter_500Medium',
                        fontSize: 18,
                        color: '#000'
                    }}
                >
                    Resultado de Pesquisa
                </Text>
            </View>
        )
    }
}