import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StyledComponent } from 'styled-components';
import { useResizeDetector } from 'react-resize-detector';
import { Image, ImageWithDimensions } from './Image';
import {
	BoxCell,
	ResponsiveGrid,
	TallCell,
	WideCell,
	CommonProps,
	CellImage,
	CellClickLayer,
} from './ImageGrid.styled';
import { useImageLoader } from './useImageLoader';

export interface ImageGridCoreProps {
	images: Image[];
	rowHeight?: number;
	onImageClicked?: (image: Image, index: number) => void;
	fallback?: React.ReactElement;
}

export interface ImageGridProps extends ImageGridCoreProps {
	queryClient: QueryClient;
}

const ImageGridCore: React.FC<React.PropsWithChildren<ImageGridCoreProps>> = ({
	images,
	rowHeight = 240,
	onImageClicked,
	fallback = null,
}) => {
	const { loadedImages, isLoading } = useImageLoader(images);
	const { width, ref } = useResizeDetector();

	const isSmallViewport = width !== undefined && width < rowHeight * 2;

	if (isLoading || !loadedImages) {
		return fallback;
	}

	return (
		<ResponsiveGrid
			ref={ref}
			isSmallViewport={isSmallViewport}
			rowHeight={rowHeight}
		>
			{loadedImages.map((x, i) => (
				<ResponsiveImage
					isSmallViewport={isSmallViewport}
					image={x}
					key={`${x.url};${x.alt}`}
					onClick={onImageClicked && (() => onImageClicked(x, i))}
				/>
			))}
		</ResponsiveGrid>
	);
};

const ResponsiveImage: React.FC<
	React.PropsWithChildren<{
		image: ImageWithDimensions;
		isSmallViewport: boolean;
		onClick?: () => void;
	}>
> = ({ image, isSmallViewport, onClick }) => {
	const Cell = getImageComponent(image);
	return (
		<Cell isSmallViewport={isSmallViewport}>
			<CellImage src={image.url} alt={image.alt} />
			{onClick && (
				<CellClickLayer role="button" onClick={onClick} tabIndex={0} />
			)}
		</Cell>
	);
};

function getImageComponent(
	image: ImageWithDimensions
): StyledComponent<'div', any, CommonProps, never> {
	const aspectRatio = image.width / image.height;

	if (aspectRatio >= 1.5) {
		return WideCell;
	}

	if (aspectRatio >= 0.75) {
		return BoxCell;
	}

	return TallCell;
}

export const ImageGrid: React.FC<React.PropsWithChildren<ImageGridProps>> = ({
	queryClient,
	...props
}) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ImageGridCore {...props} />
		</QueryClientProvider>
	);
};
