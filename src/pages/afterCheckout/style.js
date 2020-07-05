import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { normalize } from 'react-native-elements';

export default StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#7A59C5',
		paddingHorizontal: 24,
		paddingTop: Constants.statusBarHeight + 20,
	},

	afterCheckoutTitle: {
		color: 'white',
		fontFamily: 'Inter_500Medium',
		fontSize: 25,
	},

	productAttribute: {
		color: '#F4F1DE',
		fontFamily: 'Inter_500Medium',
		fontSize: 20,
	},

	ratingContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 80,
		justifyContent: 'center',
		alignItems: 'center',
	},

	ratingText: {
		marginTop: 60,
		textAlign: 'center',
		color: 'white',
		fontFamily: 'Inter_500Medium',
		fontSize: 20,
		marginBottom: 30,
	},

	friendRequestContainer: {
		alignItems: 'center',
	},

	friendRequest: {
		marginTop: 50,
		color: 'white',
		fontFamily: 'Inter_500Medium',
		fontSize: 15,
		textAlign: 'center',
	},

	overlayText: {
		color: 'black',
		fontFamily: 'Inter_500Medium',
		fontSize: 20,
	},

	frIcon: {
		textAlign: 'center',
		marginTop: 10,
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
		position: 'absolute',
		bottom: 0,
		alignSelf: 'center',
		marginBottom: 20,
		alignItems: 'center',
	},
});
