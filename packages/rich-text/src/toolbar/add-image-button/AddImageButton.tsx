import { ToggleButton } from '@campaign-buddy/core-ui';
import { Media } from '@campaign-buddy/frontend-types';
import {
	ImagePickerMenu,
	OpenPopoverState,
} from '@campaign-buddy/image-picker-menu';
import { useQueryClient } from 'react-query';
import React, { useCallback, useRef, useState } from 'react';
import { BaseRange, Transforms } from 'slate';
import { useSlateStatic } from 'slate-react';
import {
	selectEndOfElement,
	useSelectionSnapshot,
	wrapOrInsertNode,
} from '../../editor-util';
import { ImageNode } from '../../types';
import { useMediaApi } from '../../useMediaApi';

export const AddImageButton: React.FC<React.PropsWithChildren<unknown>> =
	() => {
		const editor = useSlateStatic();
		const endLocationRef = useRef<BaseRange | null>(null);

		const { pushSelectionSnapshot, popSelectionSnapshot, snapshotStack } =
			useSelectionSnapshot();

		const mediaApi = useMediaApi();
		const queryClient = useQueryClient();

		const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

		const closeImagePicker = useCallback(() => {
			setIsImagePickerOpen(false);
			popSelectionSnapshot();
		}, [popSelectionSnapshot, setIsImagePickerOpen]);

		const openImagePicker = useCallback(() => {
			if (snapshotStack.current?.length === 0) {
				pushSelectionSnapshot();
			}
			setIsImagePickerOpen(true);
		}, [pushSelectionSnapshot, snapshotStack]);

		const insertImage = useCallback(
			(url: string, media?: Media) => {
				if (endLocationRef.current) {
					Transforms.select(editor, endLocationRef.current);
				}

				const { id } = wrapOrInsertNode<ImageNode>(editor, {
					kind: 'image',
					children: [{ text: '', kind: 'text' }],
					src: url,
					alt: media?.alt ?? url,
				});

				selectEndOfElement(editor, id);
				Transforms.move(editor, { unit: 'offset' });
				endLocationRef.current = null;

				closeImagePicker();
			},
			[closeImagePicker, editor]
		);

		const handleImagePickerStateChange = useCallback(
			(oldState: OpenPopoverState, newState: OpenPopoverState) => {
				if (oldState === 'main-menu' && newState !== 'none') {
					endLocationRef.current = popSelectionSnapshot();
				}
			},
			[popSelectionSnapshot]
		);

		return (
			<ImagePickerMenu
				isOpen={isImagePickerOpen}
				onClose={close}
				onConfirm={insertImage}
				onStateTransition={handleImagePickerStateChange}
				mediaApi={mediaApi}
				queryClient={queryClient}
			>
				<ToggleButton
					icon="media"
					onChange={openImagePicker}
					size="small"
					value={false}
				/>
			</ImagePickerMenu>
		);
	};
