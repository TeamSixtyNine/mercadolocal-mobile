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
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    image: {
        marginHorizontal: -8,
        width: 60,
        height: 60
    },
    categorias: {
        marginTop: 4,
        marginLeft: -8
    },
    categoria: {
        alignItems: 'center',
        paddingVertical: 8,
        marginVertical: 8,
    }
})