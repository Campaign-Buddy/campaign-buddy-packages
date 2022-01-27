import React, { useCallback, useState } from 'react';
import { Media, MediaKind } from '@campaign-buddy/frontend-types';
import { useQuery } from 'react-query';
import { Button, Popover, Spinner, Flex } from '@campaign-buddy/core-ui';
import styled from 'styled-components';
import { useMediaApi } from '../../useMediaApi';
import { useIsMounted } from '@campaign-buddy/common-hooks';

const PopoverContentContainer = styled.div`
	width: 300px;
	max-width: 100%;
`;

const MediaContainer = styled.div`
	margin: 8px 0;

	p {
		text-align: center;
	}
`;

export interface ExistingImagePopoverProps {
	onConfirm: (media: Media) => void;
	onClose: () => void;
	isOpen: boolean;
}

const pageSize = 10;

export const ExistingImagePopover: React.FC<ExistingImagePopoverProps> = ({
	onClose,
	isOpen,
	children,
}) => {
	const mediaApi = useMediaApi();
	const isMounted = useIsMounted();

	const [currentPageOffset, setCurrentPageOffset] = useState(0);
	const [isRefetching, setIsRefetching] = useState(false);

	const { isFetching, isLoading, data, refetch } = useQuery(
		['existing-media', currentPageOffset],
		async () =>
			mediaApi.listUploadedMedia(
				pageSize + 1,
				currentPageOffset * pageSize,
				MediaKind.Image
			)
	);

	const handleRefresh = useCallback(async () => {
		setIsRefetching(true);
		await refetch();

		if (isMounted.current) {
			setIsRefetching(false);
		}
	}, [isMounted, refetch]);

	const hasNextPage = !isFetching && data?.length === pageSize + 1;

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
					<MediaContainer>
						{isLoading || isRefetching ? (
							<Flex justifyContent="center" alignItems="center">
								<Spinner size={45} />
							</Flex>
						) : (
							<p>Your media here</p>
						)}
					</MediaContainer>
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
