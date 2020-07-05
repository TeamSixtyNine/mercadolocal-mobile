import firebase from 'firebase';

class Fire {
	constructor() {
		this.init();
		this.checkAuth();
	}

	init = () => {
		var firebaseConfig = {
			apiKey: 'AIzaSyBn4Khi_DXmZBTDcZybp2wVqDhoNI_90VQ',
			authDomain: 'mercado-local-1c505.firebaseapp.com',
			databaseURL: 'https://mercado-local-1c505.firebaseio.com',
			projectId: 'mercado-local-1c505',
			storageBucket: 'mercado-local-1c505.appspot.com',
			messagingSenderId: '315620042092',
			appId: '1:315620042092:web:2e60adf4ddb10b67b73f49',
			measurementId: 'G-QFXP3LM1XV',
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
	};

	checkAuth = () => {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				firebase.auth().signInAnonymously();
			}
		});
	};

	send = (messages) => {
		messages.forEach((item) => {
			const message = {
				text: item.text,
				timestamp: firebase.database.ServerValue.TIMESTAMP,
				user: item.user,
			};

			this.db.push(message);
		});
	};

	parse = (message) => {
		const { user, text, timestamp } = message.val();
		const { key: _id } = message;
		const createdAt = new Date(timestamp);

		// console.log

		return {
			_id,
			createdAt,
			text,
			user,
		};
	};

	get = (callback) => {
		this.db.on('child_added', (snapshot) => {
			callback(this.parse(snapshot));
		});
	};

	off() {
		this.db.off();
	}

	get db() {
		return firebase.database().ref('messages');
	}

	get uid() {
		return (firebase.auth().currentUser || {}).uid;
	}
}

export default new Fire();
