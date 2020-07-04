import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Inter_500Medium } from '@expo-google-fonts/inter';

export default StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#7A59C5',
		paddingHorizontal: 24,
		paddingTop: Constants.statusBarHeight + 20,
	},

	title: {
		color: 'white',
		fontFamily: 'Inter_500Medium',
		fontSize: 20,
	},

	titleInputTitle: {
		marginTop: 20,
		color: 'white',
	},

	titleInput: {
		marginTop: 5,
		height: 40,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 10,
		padding: 10,
		color: 'white',
	},

	tradeWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	postBtn: {
		color: 'white',
		borderColor: 'red',
		marginTop: 10,
	},

	checkboxStyle: {
		color: 'white',
	},

	tradeTitle: {
		color: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
