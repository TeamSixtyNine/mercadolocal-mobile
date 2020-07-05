import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 8,
        paddingBottom: 12,
        backgroundColor: '#7A59C5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 180,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    image: {
        marginHorizontal: -8,
        width: 60,
        height: 60
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
    txtNavigator: {
        marginLeft: 12,
        marginVertical: 16,
        fontSize: 20
    },
    divBtns:{
        marginVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    divBtn:{
        marginHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 54,
        height: 54,
        backgroundColor: '#7A59C5',
        borderRadius: 50,
        marginBottom: 4
    },
    txtBtn:{
        textAlign: 'center',
        width: 60
    }
})