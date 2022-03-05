import React, { useCallback, useMemo, useState } from 'react';
import { ImageAggregation } from '@campaign-buddy/json-schema-core';
import { CBWidgetProps } from '../CBWidgetProps';
import styled from 'styled-components';
import { FormGroup, MenuItem, MenuPopover } from '@campaign-buddy/core-ui';
import { openFilePicker } from './openFilePicker';
import { useMediaApi } from '../FormWidgetProvider';
import { Media } from '@campaign-buddy/frontend-types';
import { ExistingImagePopover } from '@campaign-buddy/existing-image-popover';
import { useQueryClient } from 'react-query';
import { ExternalUrlPopover } from './ExternalUrlPopover';
import { useBooleanState } from '@campaign-buddy/common-hooks';

const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 100%;
	border-radius: 4px;
	overflow: hidden;

	img {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
`;

const ImageUploadButton = styled.div<{ shouldStayVisible: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: ${({ shouldStayVisible }) => (shouldStayVisible ? 1 : 0)};
	transition: opacity 0.2s;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: lightgrey;
	cursor: pointer;

	&:hover,
	&:focus {
		opacity: 1;
	}
`;

interface ImageData {
	url: string;
}

type ImageWidgetType = React.FC<CBWidgetProps<ImageData, ImageAggregation>>;

export const ImageWidget: ImageWidgetType = ({
	value,
	aggregatedValue,
	aggregationSupport,
	label,
	rawLabel,
	onChange,
}) => {
	const mediaApi = useMediaApi();
	const queryClient = useQueryClient();
	const [isRootMenuOpen, openRootMenu, closeRootMenu] = useBooleanState();
	const [openPopover, setOpenPopover] = useState<
		'none' | 'existing-image' | 'url'
	>('none');
	const isEditable = !aggregationSupport.url;
	const url = aggregationSupport.url ? aggregatedValue?.url : value?.url;

	const closeAllMenus = useCallback(() => {
		closeRootMenu();
		setOpenPopover('none');
	}, [closeRootMenu]);

	const openExistingImageMenu = useCallback(() => {
		setOpenPopover('existing-image');
	}, []);

	const openUrlMenu = useCallback(() => {
		setOpenPopover('url');
	}, []);

	const uploadImage = useCallback(() => {
		closeAllMenus();
		openFilePicker(async (file) => {
			const result = await mediaApi.uploadMedia(file);
			onChange({
				url: result.url,
			});
		});
	}, [mediaApi, onChange, closeAllMenus]);

	const onConfirmExistingImage = useCallback(
		(media: Media) => {
			closeAllMenus();
			onChange({
				url: media.url,
			});
		},
		[closeAllMenus, onChange]
	);

	const onConfirmExternalUrl = useCallback(
		(url: string) => {
			closeAllMenus();
			onChange({ url });
		},
		[closeAllMenus, onChange]
	);

	const menuItems = useMemo<MenuItem[]>(
		() => [
			{
				displayText: 'Upload image',
				icon: 'upload',
				onClick: uploadImage,
			},
			{
				displayText: 'Use existing image',
				icon: 'cloud-download',
				onClick: openExistingImageMenu,
			},
			{
				displayText: 'Use external url',
				icon: 'link',
				onClick: openUrlMenu,
			},
		],
		[openExistingImageMenu, openUrlMenu, uploadImage]
	);

	let ImageComponent;
	if (!url) {
		ImageComponent = (
			<>
				<p>No Image</p>
			</>
		);
	} else {
		ImageComponent = <img alt={rawLabel} src={url} />;
	}

	return (
		<FormGroup label={label}>
			<ImageContainer>
				{ImageComponent}
				{isEditable && (
					<MenuPopover
						onClose={closeRootMenu}
						isOpen={isRootMenuOpen}
						items={menuItems}
					>
						<ExistingImagePopover
							isOpen={!isRootMenuOpen && openPopover === 'existing-image'}
							onClose={closeAllMenus}
							onConfirm={onConfirmExistingImage}
							mediaApi={mediaApi}
							queryClient={queryClient}
						>
							<ExternalUrlPopover
								onConfirm={onConfirmExternalUrl}
								isOpen={!isRootMenuOpen && openPopover === 'url'}
								onClose={closeAllMenus}
							>
								<ImageUploadButton
									shouldStayVisible={openPopover !== 'none' || isRootMenuOpen}
									role="button"
									onClick={openRootMenu}
									tabIndex={0}
								>
									<p>Upload Image</p>
								</ImageUploadButton>
							</ExternalUrlPopover>
						</ExistingImagePopover>
					</MenuPopover>
				)}
			</ImageContainer>
		</FormGroup>
	);
};
