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
		unsplash
			.get(`search/photos?page=${pageNumber}&query=${query}`)
			.then((response) => {
				setLoading(false);
				setError(null);
				setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
			})
			.catch((err) => {
				setError(err);
			});
	}, [pageNumber, query]);

	return { photos, error, loading };
};

export default usePhotos;
