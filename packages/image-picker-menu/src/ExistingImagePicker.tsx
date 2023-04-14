import React, { useCallback, useState } from 'react';
import { Media, MediaKind } from '@campaign-buddy/frontend-types';
import { Button, Popover, Spinner, Flex } from '@campaign-buddy/core-ui';
import { MediaApi } from '@campaign-buddy/frontend-types';
import { Image, ImageGrid } from '@campaign-buddy/image-grid';
import { useIsMounted } from '@campaign-buddy/common-hooks';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import {
	PopoverContentContainer,
	MediaContainer,
} from './ExistingImagePicker.styled';

export interface ExistingImagePickerProps {
	onConfirm: (media: Media) => void;
	onClose: () => void;
	isOpen: boolean;
	mediaApi: MediaApi;
	queryClient: QueryClient;
}

const pageSize = 10;

export const ExistingImagePicker: React.FC<
	React.PropsWithChildren<Omit<ExistingImagePickerProps, 'queryClient'>>
> = ({ onClose, onConfirm, isOpen, children, mediaApi }) => {
	const isMounted = useIsMounted();

	const [currentPageOffset, setCurrentPageOffset] = useState(0);
	const [isRefetching, setIsRefetching] = useState(false);

	const queryClient = useQueryClient();
	const { isLoading, data, refetch } = useQuery(
		['package-campaign-buddy-existing-media-popover', currentPageOffset],
		async () =>
			(
				await mediaApi.listUploadedMedia({
					limit: pageSize + 1,
					offset: currentPageOffset * pageSize,
					type: MediaKind.Image,
				})
			).media
	);

	const hasUploadedMedia = data && data.length > 0;

	const handleRefresh = useCallback(async () => {
		setIsRefetching(true);
		await refetch();

		if (isMounted.current) {
			setIsRefetching(false);
		}
	}, [isMounted, refetch]);

	const hasNextPage =
		!isLoading && !isRefetching && data?.length === pageSize + 1;

	const nextPage = useCallback(
		() => setCurrentPageOffset((prev) => prev + 1),
		[]
	);

	const previousPage = useCallback(
		() => setCurrentPageOffset((prev) => prev - 1),
		[]
	);

	const loadingElement = <Spinner size="fullPage" fullHeight />;

	const handleImageSelected = useCallback(
		(image: Image, index: number) => {
			if (!data) {
				return;
			}
			onConfirm(data[index]);
		},
		[onConfirm, data]
	);

	return (
		<Popover
			isOpen={isOpen}
			onClose={onClose}
			placement="bottom-start"
			noMargin
			content={
				<PopoverContentContainer>
					<Flex justifyContent="space-between" alignItems="center">
						<p>Your media</p>
						<Button
							onClick={handleRefresh}
							icon="refresh"
							variant="minimal"
							size="small"
							disabled={isRefetching}
						/>
					</Flex>
					{isLoading || isRefetching ? (
						<MediaContainer>{loadingElement}</MediaContainer>
					) : hasUploadedMedia && data ? (
						<MediaContainer>
							<ImageGrid
								rowHeight={100}
								queryClient={queryClient}
								images={data}
								fallback={loadingElement}
								onImageClicked={handleImageSelected}
							/>
						</MediaContainer>
					) : (
						<p>You have no uploaded media!</p>
					)}
					<Flex justifyContent="flex-end" gap={4}>
						<Button
							onClick={previousPage}
							size="small"
							variant="minimal"
							icon="caret-left"
							disabled={currentPageOffset === 0}
						/>
						<Button
							onClick={nextPage}
							size="small"
							variant="minimal"
							icon="caret-right"
							disabled={!hasNextPage}
						/>
					</Flex>
				</PopoverContentContainer>
			}
		>
			{children}
		</Popover>
	);
};
