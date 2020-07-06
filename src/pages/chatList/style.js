import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { normalize } from 'react-native-elements';

export default StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#7A59C5',
		paddingTop: Constants.statusBarHeight + 20,
	},

	titleContainer: {
		paddingHorizontal: 24,
		flexDirection: 'row',
		alignItems: 'center',
	},

	chatTitle: {
		color: 'white',
		fontFamily: 'Inter_500Medium',
		fontSize: 25,
		marginLeft: 5,
	},

	item: {
		flexDirection: 'row',
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		padding: 20,
		width: '100%',
		borderColor: 'white',
		borderWidth: 1,
	},
	title: {
		marginLeft: 10,
		fontSize: 15,
		color: 'white',
	},
});
