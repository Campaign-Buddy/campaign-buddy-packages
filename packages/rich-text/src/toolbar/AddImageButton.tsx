import { ToggleButton, MenuPopover, MenuItem } from '@campaign-buddy/core-ui';
import React, { useCallback, useMemo, useState } from 'react';
import { Transforms } from 'slate';
import { useSlateStatic } from 'slate-react';
import {
	selectEndOfElement,
	useSelectionSnapshot,
	wrapOrInsertNode,
} from '../editor-util';
import { openFilePicker } from '../openFilePicker';
import { ImageNode } from '../types';
import { useMediaApi } from '../useMediaApi';

export const AddImageButton: React.FC = () => {
	const editor = useSlateStatic();
	const { pushSelectionSnapshot, popSelectionSnapshot } =
		useSelectionSnapshot();

	const mediaApi = useMediaApi();

	const [openPopover, setOpenPopover] = useState<
		'none' | 'menu' | 'existing' | 'url'
	>('none');

	const closePopover = useCallback(() => {
		setOpenPopover('none');
		popSelectionSnapshot();
	}, [popSelectionSnapshot]);

	const openMenu = useCallback(() => {
		pushSelectionSnapshot();
		setOpenPopover('menu');
	}, [pushSelectionSnapshot]);

	const uploadImage = useCallback(() => {
		const location = popSelectionSnapshot();
		openFilePicker(async (file) => {
			const result = await mediaApi.uploadMedia(file);

			if (location) {
				Transforms.select(editor, location);
			}

			const { id } = wrapOrInsertNode<ImageNode>(editor, {
				kind: 'image',
				children: [{ text: '', kind: 'text' }],
				src: result.url,
				alt: file.name,
			});

			selectEndOfElement(editor, id);
			Transforms.move(editor, { unit: 'offset' });

			setOpenPopover('none');
		});
	}, [editor, mediaApi, popSelectionSnapshot]);

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
				onClick: () => setOpenPopover('existing'),
			},
			{
				displayText: 'Use external url',
				icon: 'link',
				onClick: () => setOpenPopover('url'),
			},
		],
		[uploadImage]
	);

	return (
		<MenuPopover
			items={menuItems}
			isOpen={openPopover === 'menu'}
			onClose={closePopover}
		>
			<ToggleButton
				icon="media"
				onChange={openMenu}
				size="small"
				value={false}
			/>
		</MenuPopover>
	);
};
