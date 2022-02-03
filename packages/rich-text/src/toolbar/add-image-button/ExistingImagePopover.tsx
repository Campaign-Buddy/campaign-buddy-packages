import React, { useCallback, useState } from 'react';
import { Media, MediaKind } from '@campaign-buddy/frontend-types';
import { useQuery } from 'react-query';
import { Button, Popover, Spinner, Flex } from '@campaign-buddy/core-ui';
import { useMediaApi } from '../../useMediaApi';
import { useIsMounted } from '@campaign-buddy/common-hooks';
import {
	PopoverContentContainer,
	MediaContainer,
} from './ExistingImagePopover.styled';

export interface ExistingImagePopoverProps {
	onConfirm: (media: Media) => void;
	onClose: () => void;
	isOpen: boolean;
}

const pageSize = 5;

export const ExistingImagePopover: React.FC<ExistingImagePopoverProps> = ({
	onClose,
	isOpen,
	children,
}) => {
	const mediaApi = useMediaApi();
	const isMounted = useIsMounted();

	const [currentPageOffset, setCurrentPageOffset] = useState(0);
	const [isRefetching, setIsRefetching] = useState(false);

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
						<Flex justifyContent="center" alignItems="center">
							<Spinner size={45} />
						</Flex>
					) : hasUploadedMedia ? (
						<MediaContainer>
							{data?.slice(0, pageSize).map((x) => (
								<img
									key={x.assetId}
									alt={x.alt ?? x.assetId}
									src={x.thumbnailUrl ?? x.url}
								/>
							))}
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
