import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight
    },
    anuncios: {
        marginTop: 4,
        marginHorizontal: 40,
    },
    anuncio: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        alignItems: 'center',
        paddingVertical: 12,
        marginVertical: 12,
    },
    imageAnuncio: {
        width: 140,
        height: 140
    },
    txtInfo: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        marginTop: 16,
        backgroundColor: '#7A59C5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8
    },
    txt: {
        fontSize: 20,
        textAlign: 'center'
    },
    txtResult: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})