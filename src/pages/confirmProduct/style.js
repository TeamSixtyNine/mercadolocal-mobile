import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Inter_500Medium, Inter_300Light } from '@expo-google-fonts/inter';

export default StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#7A59C5',
		paddingHorizontal: 24,
		paddingTop: Constants.statusBarHeight + 20,
	},

	confirmTitle: {
		color: 'white',
		fontFamily: 'Inter_500Medium',
		fontSize: 25,
	},

	productTitle: {
		color: 'white',
		fontFamily: 'Inter_500Medium',
		fontSize: 20,
		alignSelf: 'center',
		marginTop: 20,
		marginBottom: 20,
	},

	pictureStyle: {
		marginTop: 50,
		width: 300,
		height: 300,
		alignSelf: 'center',
	},

	price: {
		color: 'white',
		fontFamily: 'Inter_500Medium',
		fontSize: 20,
		alignSelf: 'center',
		marginBottom: 20,
	},

	confirmButtonText: {
		color: 'white',
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
	},

	confirmButton: {
		borderColor: 'white',
		borderRadius: 20,
		borderWidth: 1,
		width: 200,
		height: 50,
		justifyContent: 'center',
	},

	buttonContainer: {
		alignSelf: 'center',
		marginBottom: 20,
	},
});
