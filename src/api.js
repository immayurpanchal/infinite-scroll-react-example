import { default as axios } from 'axios';

const unsplash = axios.create({
	method: 'GET',
	baseURL: 'https://api.unsplash.com/',
	headers: {
		Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH}`,
		'Accept-Version': 'v1',
	},
});

export default unsplash;
