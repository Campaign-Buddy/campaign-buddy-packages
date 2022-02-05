import { useQueries } from 'react-query';
import { Image as ImageType, ImageWithDimensions } from './Image';

interface UseImageLoaderHook {
	loadedImages?: ImageWithDimensions[];
	isLoading: boolean;
}

export function useImageLoader(images: ImageType[]): UseImageLoaderHook {
	const results = useQueries(
		images.map((image) => ({
			queryKey: ['package-campaign-buddy-image-grid', image.url],
			queryFn: () => loadImage(image),
		}))
	);

	const isLoading = results.some((x) => x.isLoading);

	return {
		loadedImages: isLoading
			? undefined
			: results
					.map((x) => x.data)
					.filter((x): x is ImageWithDimensions => Boolean(x)),
		isLoading,
	};
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
