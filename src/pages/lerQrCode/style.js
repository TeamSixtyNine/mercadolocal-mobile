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
});
