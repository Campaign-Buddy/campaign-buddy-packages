import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StyledComponent } from 'styled-components';
import { Image, ImageWithDimensions } from './Image';
import {
	BoxImage,
	ResponsiveGrid,
	TallImage,
	WideImage,
} from './ImageGrid.styled';
import { useImageLoader } from './useImageLoader';

const queryClient = new QueryClient();

export interface ImageGridProps {
	images: Image[];
	onImageClicked?: (image: Image, index: number) => void;
	onImagesLoaded?: () => void;
}

const ImageGridCore: React.FC<ImageGridProps> = ({
	images,
	onImagesLoaded,
}) => {
	const { loadedImages, isLoading } = useImageLoader(images, onImagesLoaded);

	if (isLoading || !loadedImages) {
		return null;
	}

	return (
		<ResponsiveGrid>
			{loadedImages.map((x) => (
				<ResponsiveImage image={x} key={`${x.url};${x.alt}`} />
			))}
		</ResponsiveGrid>
	);
};

const ResponsiveImage: React.FC<{ image: ImageWithDimensions }> = ({
	image,
}) => {
	const Component = getImageComponent(image);
	return <Component src={image.url} alt={image.alt} />;
};

function getImageComponent(
	image: ImageWithDimensions
): StyledComponent<'img', any, any, never> {
	const aspectRatio = image.width / image.height;

	if (aspectRatio >= 1.5) {
		return WideImage;
	}

	if (aspectRatio >= 0.75) {
		return BoxImage;
	}

	return TallImage;
}

export const ImageGrid: React.FC<ImageGridProps> = (props) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ImageGridCore {...props} />
		</QueryClientProvider>
	);
};
