import React, { useState } from 'react';
import {
	Text,
	View,
	SafeAreaView,
	FlatList,
	Item,
	AsyncStorage,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import client from '../../client';

import style from './style';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function chatList({ route, navigation }) {
	const { otherUserID, myUserID } = route.params;

	console.log(otherUserID, myUserID);
	return (
		<View style={style.container}>
			<Text>Chat with user</Text>
		</View>
	);
}
