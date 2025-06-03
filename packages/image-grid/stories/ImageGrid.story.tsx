import { useMemo } from 'react';
import { QueryClient } from 'react-query';
import { Image, ImageGrid } from '../src';

export default {
	title: 'image-grid/ImageGrid',
	component: ImageGrid,
};

const getImages = (count: number): Image[] =>
	Array(count)
		.fill(0)
		.map(() => {
			const seed = Math.random().toString().substring(2);
			const width = randomInt(10, 30);
			const height = randomInt(10, 30);

			return {
				url: `https://picsum.photos/seed/${seed}/${width * 50}/${height * 50}`,
				alt: `Random picsum with seed = ${seed}`,
			};
		});

const randomInt = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);

const queryClient = new QueryClient();

export const Primary = () => {
	const images = useMemo(() => getImages(20), []);

	return (
		<ImageGrid
			queryClient={queryClient}
			images={images}
			onImageClicked={(image) => console.log(image)}
			fallback={<p>Loading...</p>}
		/>
	);
};
