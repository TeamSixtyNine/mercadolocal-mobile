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

export default function chatList({ navigation }) {
	const [chatList, setChatList] = useState([{}]);

	const DATA = chatList;

	let myUserID;

	(async function getChatList() {
		// Get my user ID
		const accessToken = await AsyncStorage.getItem('auth');

		const myUser = await client.get('/me', {
			headers: {
				authorization: accessToken.split('"')[1],
			},
		});

		myUserID = myUser.data.id;

		// Get my friendlist // TODO: replace for 'my chatlist'
		const response = await client.get(`/friendlist/${myUserID}`, {
			headers: {
				authorization: accessToken.split('"')[1],
			},
		});
		const nChats = [];
		response.data.forEach((chats) => {
			nChats.push({ id: chats, title: chats });
		});

		setChatList(nChats);
	})();

	function chatWithUser(id) {
		navigation.navigate('chatWithUser', {
			otherUserID: id,
			myUserID,
		});
	}

	// TODO: get user nickname
	function Item({ title, id }) {
		return (
			<View>
				<TouchableWithoutFeedback
					style={style.item}
					onPress={() => chatWithUser(id)}
				>
					<Feather
						style={style.frIcon}
						name="send"
						size={24}
						color="#fff"
					/>
					<Text style={style.title}>{title}</Text>
					{/* <Text style={style.title}>{id}</Text> */}
				</TouchableWithoutFeedback>
			</View>
		);
	}

	return (
		<View style={style.container}>
			<View style={style.titleContainer}>
				<Feather
					style={style.frIcon}
					name="message-circle"
					size={24}
					color="#fff"
					// onPress={() => sendFriendRequest(paginaPrincipal)}
				/>
				<Text style={style.chatTitle}>Chats</Text>
			</View>

			<SafeAreaView style={style.container}>
				<FlatList
					data={DATA}
					renderItem={({ item }) => (
						<Item title={item.title} id={item.id} />
					)}
					keyExtractor={(item) => item.id}
				/>
			</SafeAreaView>
		</View>
	);
}
