import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Image } from './Image';
import { useImageLoader } from './useImageLoader';

const queryClient = new QueryClient();

export interface ImageGridProps {
	images: Image[];
	onImageClicked?: (image: Image, index: number) => void;
	onImagesLoaded?: () => void;
}

const ImageGridCore: React.FC<ImageGridProps> = ({
	images,
	onImageClicked,
	onImagesLoaded,
}) => {
	const { loadedImages, isLoading } = useImageLoader(images, onImagesLoaded);

	if (isLoading || !loadedImages) {
		return null;
	}

	return (
		<div>
			{loadedImages.map((x, i) => (
				<img
					src={x.url}
					alt={x.alt}
					key={`${x.url};${x.alt}`}
					onClick={() => onImageClicked?.(x, i)}
				/>
			))}
		</div>
	);
};

export const ImageGrid: React.FC<ImageGridProps> = (props) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ImageGridCore {...props} />
		</QueryClientProvider>
	);
};
