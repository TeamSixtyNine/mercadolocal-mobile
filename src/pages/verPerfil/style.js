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
    divInfo:{
        marginVertical: 20,
        paddingHorizontal: 24,
    },
    txt:{
        fontWeight: 'bold',
        fontSize: 16
    },
    txtInfo:{
        fontSize: 18,
        marginBottom: 20
    },
    divBtns:{
        marginTop: 12,
        alignItems: "center",
        justifyContent: "center"
    },
    button:{
        marginVertical: 12,
        backgroundColor: '#7A59C5',
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 12
    }
})