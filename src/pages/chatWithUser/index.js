import React, { Component } from 'react';
import {
	View,
	Text,
	Platform,
	KeyboardAvoidingView,
	SafeAreaView,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../../Fire';
import style from './style';

export class chatWithUser extends Component {
	state = {
		messages: [],
		// sender: this.props.route.myUserID,
		// recipient: this.props.route.otherUserID,
	};

	// get info() {
	// 	return {
	// 		_id: Fire.uid,
	// 		from: this.state.sender,
	// 		to: this.state.recipient,
	// 	};
	// }

	componentDidMount() {
		const { route, navigation } = this.props;
		console.log(route);
		const { myUserID, otherUserID } = route.params;

		Fire.get((message) => {
			// console.log(message.user.to);

			if (message.user.from == myUserID) {
				if (message.user.to == otherUserID) {
					this.setState((previous) => ({
						messages: GiftedChat.append(previous.messages, message),
					}));
				}
			} else if (message.user.from == otherUserID) {
				if (message.user.to == myUserID) {
					this.setState((previous) => ({
						messages: GiftedChat.append(previous.messages, message),
					}));
				}
			}
		});
	}

	componentWillUnmount() {
		Fire.off();
	}

	render() {
		const { route, navigation } = this.props;
		const { myUserID, otherUserID } = route.params;

		const chat = (
			<GiftedChat
				messages={this.state.messages}
				onSend={Fire.send}
				user={{
					_id: Fire.uid,
					from: myUserID,
					to: otherUserID,
				}}
			/>
		);

		return (
			<View style={style.container}>
				<Text style={style.user}> {otherUserID}</Text>
				<SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>
			</View>
		);
	}
}

export default chatWithUser;
