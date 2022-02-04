import React, { useCallback, useState } from 'react';
import { Media, MediaKind } from '@campaign-buddy/frontend-types';
import { Button, Popover, Spinner, Flex } from '@campaign-buddy/core-ui';
import { Image, ImageGrid } from '@campaign-buddy/image-grid';
import { useQuery, useQueryClient } from 'react-query';
import { useMediaApi } from '../../useMediaApi';
import { useIsMounted } from '@campaign-buddy/common-hooks';
import {
	PopoverContentContainer,
	MediaContainer,
	LoadingContainer,
} from './ExistingImagePopover.styled';

export interface ExistingImagePopoverProps {
	onConfirm: (media: Media) => void;
	onClose: () => void;
	isOpen: boolean;
}

const pageSize = 10;

export const ExistingImagePopover: React.FC<ExistingImagePopoverProps> = ({
	onClose,
	onConfirm,
	isOpen,
	children,
}) => {
	const mediaApi = useMediaApi();
	const isMounted = useIsMounted();

	const [currentPageOffset, setCurrentPageOffset] = useState(0);
	const [isRefetching, setIsRefetching] = useState(false);

	const queryClient = useQueryClient();
	const { isLoading, data, refetch } = useQuery(
		['existing-media', currentPageOffset],
		async () =>
			mediaApi.listUploadedMedia(
				pageSize + 1,
				currentPageOffset * pageSize,
				MediaKind.Image
			)
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

	const loadingElement = (
		<LoadingContainer>
			<Spinner size={45} />
		</LoadingContainer>
	);

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
							style="minimal"
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
							style="minimal"
							icon="caret-left"
							disabled={currentPageOffset === 0}
						/>
						<Button
							onClick={nextPage}
							size="small"
							style="minimal"
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
