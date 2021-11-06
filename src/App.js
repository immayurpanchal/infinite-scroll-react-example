import { useCallback, useRef, useState, useEffect } from 'react';
import './App.css';
import useDebounceQuery from './useDebounce';
import usePhotos from './usePhotos';

const App = () => {
	console.log('App component rendered');
	const [pageNumber, setPageNumber] = useState(1);
	const [query, setQuery] = useState('office');
	const [count, setCount] = useState(0);

	// Step 2 - Create observer Ref.
	const observer = useRef();
	// Step 1 - add a callback function to be called when the node ref is "mounted"
	// useCallback is used to prevent the callback from being recreated on every render
	const lastImgRef = useCallback((node) => {
		// Step 5 - Disconnect old observer from Ref.current
		if (observer.current) observer.current.disconnect();
		// Step 3 - Create the new IntersectionObserver and store the obj. in observer.current
		observer.current = new IntersectionObserver((entries) => {
			// Step 6 - if intersecting then update the page number
			if (entries[0].isIntersecting) {
				setPageNumber((prevPage) => prevPage + 1);
			}
		});

		// Step 4 - If node is found, add it to the observer
		if (node) observer.current.observe(node);
	}, []);

	const queryDelayed = useDebounceQuery(query, 500);

	const { photos, loading, error } = usePhotos(queryDelayed, pageNumber);

	return (
		<div className='App'>
			<input value={query} onChange={(e) => setQuery(e.target.value)} />
			<h1>{count}</h1>
			<button onClick={() => setCount((prev) => prev + 1)}>Count +1</button>
			{photos.map((photo, index) => {
				if (photos.length === index + 1) {
					return (
						// Step 0 - Add ref of last image for IntersectionObserver
						<div ref={lastImgRef}>
							<img
								src={photo.urls.regular}
								alt={photo.alt_description}
								style={{ height: '200px' }}
							/>
						</div>
					);
				}
				return (
					<div>
						<img
							src={photo.urls.regular}
							alt={photo.alt_description}
							style={{ height: '200px' }}
						/>
					</div>
				);
			})}
			{loading && <h1>Loading...</h1>}
			{error && <h1>Error...</h1>}
		</div>
	);
};

export default App;
