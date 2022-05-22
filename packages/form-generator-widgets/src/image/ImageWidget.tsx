import React, { useCallback } from 'react';
import { ImageAggregation } from '@campaign-buddy/json-schema-core';
import { ImagePickerMenu } from '@campaign-buddy/image-picker-menu';
import { CBWidgetProps } from '../CBWidgetProps';
import styled from 'styled-components';
import { FormGroup } from '@campaign-buddy/core-ui';
import { useMediaApi } from '../FormWidgetProvider';
import { useQueryClient } from 'react-query';
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

type ImageWidgetType = React.FC<
	React.PropsWithChildren<CBWidgetProps<ImageData, ImageAggregation>>
>;

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

	const [isImagePickerOpen, openImagePicker, closeImagePicker] =
		useBooleanState();

	const isEditable = !aggregationSupport.url;
	const url = aggregationSupport.url ? aggregatedValue?.url : value?.url;

	const handleChange = useCallback(
		(url: string) => {
			closeImagePicker();
			onChange({
				url,
			});
		},
		[onChange, closeImagePicker]
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
					<ImagePickerMenu
						isOpen={isImagePickerOpen}
						onClose={closeImagePicker}
						onConfirm={handleChange}
						mediaApi={mediaApi}
						queryClient={queryClient}
					>
						<ImageUploadButton
							shouldStayVisible={isImagePickerOpen}
							role="button"
							onClick={openImagePicker}
							tabIndex={0}
						>
							<p>Upload Image</p>
						</ImageUploadButton>
					</ImagePickerMenu>
				)}
			</ImageContainer>
		</FormGroup>
	);
};
