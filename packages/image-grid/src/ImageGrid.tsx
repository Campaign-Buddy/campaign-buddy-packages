import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StyledComponent } from 'styled-components';
import { useResizeDetector } from 'react-resize-detector';
import { Image, ImageWithDimensions } from './Image';
import {
	BoxImage,
	ResponsiveGrid,
	TallImage,
	WideImage,
	CommonProps,
} from './ImageGrid.styled';
import { useImageLoader } from './useImageLoader';

const queryClient = new QueryClient();

export interface ImageGridProps {
	images: Image[];
	cellWidth?: number;
	onImageClicked?: (image: Image, index: number) => void;
	onImagesLoaded?: () => void;
}

const ImageGridCore: React.FC<ImageGridProps> = ({
	images,
	onImagesLoaded,
	cellWidth = 240,
}) => {
	const { loadedImages, isLoading } = useImageLoader(images, onImagesLoaded);
	const { width, ref } = useResizeDetector();

	const isSmallViewport = width !== undefined && width < cellWidth * 2;

	if (isLoading || !loadedImages) {
		return null;
	}

	return (
		<ResponsiveGrid ref={ref} isSmallViewport={isSmallViewport}>
			{loadedImages.map((x) => (
				<ResponsiveImage
					isSmallViewport={isSmallViewport}
					image={x}
					key={`${x.url};${x.alt}`}
				/>
			))}
		</ResponsiveGrid>
	);
};

const ResponsiveImage: React.FC<{
	image: ImageWithDimensions;
	isSmallViewport: boolean;
}> = ({ image, isSmallViewport }) => {
	const Component = getImageComponent(image);
	return (
		<Component
			isSmallViewport={isSmallViewport}
			src={image.url}
			alt={image.alt}
		/>
	);
};

function getImageComponent(
	image: ImageWithDimensions
): StyledComponent<'img', any, CommonProps, never> {
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
