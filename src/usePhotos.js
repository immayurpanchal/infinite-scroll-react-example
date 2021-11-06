import axios from 'axios';
import { useEffect, useState } from 'react';
import unsplash from './api';

const usePhotos = (query = 'office', pageNumber = 1) => {
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setPhotos([]);
	}, [query]);

	useEffect(() => {
		setLoading(true);
		let cancel = null;
		unsplash
			.get(`search/photos?page=${pageNumber}&query=${query}`, {
				cancelToken: new axios.CancelToken((c) => (cancel = c)),
			})
			.then((response) => {
				setLoading(false);
				setError(null);
				setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
			})
			.catch((err) => {
				if (axios.isCancel(err)) return;
				setError(err);
			});

		return () => cancel();
	}, [pageNumber, query]);

	return { photos, error, loading };
};

export default usePhotos;
