import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { Image as ImageType } from './Image';

interface ImageDimensions {
	width: number;
	height: number;
}

type ImageWithDimensions = ImageType & ImageDimensions;

interface UseImageLoaderHook {
	loadedImages?: ImageWithDimensions[];
	isLoading: boolean;
}

export function useImageLoader(
	images: ImageType[],
	onImagesLoaded?: () => void
): UseImageLoaderHook {
	const onSuccess = useCallback(() => onImagesLoaded?.(), [onImagesLoaded]);

	const { isLoading, data } = useQuery(
		getQueryKey(images),
		() => Promise.all(images.map(loadImage)),
		{ onSuccess }
	);

	return {
		loadedImages: data,
		isLoading,
	};
}

function getQueryKey(images: ImageType[]): string[] {
	return images.map((x) => `${x.url};${x.alt}`);
}

function loadImage(image: ImageType): Promise<ImageWithDimensions> {
	const loadableImage = new Image();
	return new Promise<ImageWithDimensions>((resolve, reject) => {
		loadableImage.onload = () => {
			resolve({
				...image,
				width: loadableImage.width,
				height: loadableImage.height,
			});
		};

		loadableImage.onerror = (params) => {
			reject(params);
		};

		loadableImage.src = image.url;
	});
}
