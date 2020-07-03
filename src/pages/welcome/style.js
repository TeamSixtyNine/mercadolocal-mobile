import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#7A59C5',
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },
    viewIMG:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 160,
        height: 160
    },

    viewMSG:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    viewBTN: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        marginTop: 200,
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 16
    }
})