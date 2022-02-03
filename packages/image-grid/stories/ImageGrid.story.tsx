import React, { useMemo } from 'react';
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
			const width = randomInt(10, 30) * 10;
			const height = randomInt(10, 30) * 10;

			return {
				url: `https://picsum.photos/seed/${seed}/${width * 10}/${height * 10}`,
				alt: `Random picsum with seed = ${seed}`,
			};
		});

const randomInt = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);

export const Primary = () => {
	const images = useMemo(() => getImages(20), []);

	return <ImageGrid images={images} />;
};
