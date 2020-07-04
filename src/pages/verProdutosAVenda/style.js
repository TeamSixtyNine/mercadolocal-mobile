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
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtHeader0: {
        fontSize: 12,
        color: '#fff'
    },
    txtHeader1: {
        fontSize: 24,
        color: '#fff'
    },
    txtHeader2: {
        fontSize: 16,
        color: '#fff'
    },
    imgProfile: {
        width: 100,
        height: 100,
    },
    produtos: {
        marginTop: 4,
        marginHorizontal: 40,
    },
    produto: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        alignItems: 'center',
        paddingVertical: 12,
        marginVertical: 12,
    },
    imageProduto: {
        width: 140,
        height: 140
    },
    button: {
        marginTop: 16,
        backgroundColor: '#7A59C5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8
    }
})