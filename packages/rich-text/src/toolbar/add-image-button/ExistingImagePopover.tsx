import React, { useCallback, useState } from 'react';
import { Media, MediaKind } from '@campaign-buddy/frontend-types';
import { useQuery } from 'react-query';
import { Button, Popover, Spinner, Flex } from '@campaign-buddy/core-ui';
import styled from 'styled-components';
import { useMediaApi } from '../../useMediaApi';

const PopoverContentContainer = styled.div`
	width: 300px;
	max-width: 100%;
`;

const MediaContainer = styled.div`
	margin: 8px 0;
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

	const [currentPageOffset, setCurrentPageOffset] = useState(0);

	const { isLoading, data } = useQuery(
		['existing-media', currentPageOffset],
		() =>
			mediaApi.listUploadedMedia(
				pageSize + 1,
				currentPageOffset * pageSize,
				MediaKind.Image
			)
	);

	const hasNextPage = !isLoading && data?.length === pageSize + 1;

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
							onClick={() => console.log('refresh')}
							icon="refresh"
							style="minimal"
							size="small"
							disabled={isLoading}
						/>
					</Flex>
					<MediaContainer>
						<Flex justifyContent="center" alignItems="center">
							{isLoading ? <Spinner size={45} /> : <p>Your media here</p>}
						</Flex>
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
