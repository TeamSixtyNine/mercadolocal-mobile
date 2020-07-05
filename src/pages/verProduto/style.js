import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1
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
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    image: {
        marginHorizontal: -8,
        width: 60,
        height: 60
    },
    divProduto: {
        flex: 1,
        alignItems: 'center'
    },
    img:{
        marginVertical: 20,
        width: 260,
        height: 260,
    },
    btnImg: {
        marginHorizontal: 12
    },
    txt:{
        fontSize: 16
    },
    txtInfo:{
        fontSize: 28
    },
    button: {
        marginTop: 16,
        backgroundColor: '#7A59C5',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 8
    },
    divBtn:{
        marginHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        height: 64,
        backgroundColor: '#7A59C5',
        borderRadius: 50,
        marginBottom: 4
    },
    txtBtn:{
        textAlign: 'center',
        width: 70
    },
    divBtns:{
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'center',
    }
})