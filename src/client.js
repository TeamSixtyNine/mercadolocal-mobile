var axios = require('react-native-axios');

var axiosInstance = axios.create({
	baseURL: 'http://192.168.25.12:5000',
	/* other custom settings */
});

module.exports = axiosInstance;
