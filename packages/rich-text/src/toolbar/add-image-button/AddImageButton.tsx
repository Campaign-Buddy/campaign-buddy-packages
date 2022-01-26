import { ToggleButton, MenuPopover, MenuItem } from '@campaign-buddy/core-ui';
import { Media } from '@campaign-buddy/frontend-types';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { BaseRange, Transforms } from 'slate';
import { useSlateStatic } from 'slate-react';
import {
	selectEndOfElement,
	useSelectionSnapshot,
	wrapOrInsertNode,
} from '../../editor-util';
import { openFilePicker } from '../../openFilePicker';
import { ImageNode } from '../../types';
import { useMediaApi } from '../../useMediaApi';
import { ExistingImagePopover } from './ExistingImagePopover';
import { ExternalUrlPopover } from './ExternalUrlPopover';

export const AddImageButton: React.FC = () => {
	const editor = useSlateStatic();
	const endLocationRef = useRef<BaseRange | null>(null);

	const { pushSelectionSnapshot, popSelectionSnapshot, snapshotStack } =
		useSelectionSnapshot();

	const mediaApi = useMediaApi();

	const [openPopover, setOpenPopover] = useState<'none' | 'existing' | 'url'>(
		'none'
	);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const closeMenu = useCallback(() => {
		setIsMenuOpen(false);
		popSelectionSnapshot();
	}, [popSelectionSnapshot]);

	const closeAllPopovers = useCallback(() => {
		setIsMenuOpen(false);
		setOpenPopover('none');
		popSelectionSnapshot();
	}, [popSelectionSnapshot]);

	const openMenu = useCallback(() => {
		if (snapshotStack.current?.length === 0) {
			pushSelectionSnapshot();
		}

		setOpenPopover('none');
		setIsMenuOpen(true);
	}, [pushSelectionSnapshot, snapshotStack]);

	const insertImage = useCallback(
		(url: string, alt?: string) => {
			if (endLocationRef.current) {
				Transforms.select(editor, endLocationRef.current);
			}

			const { id } = wrapOrInsertNode<ImageNode>(editor, {
				kind: 'image',
				children: [{ text: '', kind: 'text' }],
				src: url,
				alt: alt ?? url,
			});

			selectEndOfElement(editor, id);
			Transforms.move(editor, { unit: 'offset' });
			endLocationRef.current = null;

			closeAllPopovers();
		},
		[closeAllPopovers, editor]
	);

	const insertMedia = useCallback(
		(media: Media) => {
			insertImage(media.url, media.alt);
		},
		[insertImage]
	);

	const uploadImage = useCallback(() => {
		endLocationRef.current = popSelectionSnapshot();
		openFilePicker(async (file) => {
			const result = await mediaApi.uploadMedia(file);
			insertImage(result.url, file.name);
		});
	}, [insertImage, mediaApi, popSelectionSnapshot]);

	const openExistingMediaPopover = useCallback(() => {
		endLocationRef.current = popSelectionSnapshot();
		setIsMenuOpen(false);
		setOpenPopover('existing');
	}, [popSelectionSnapshot]);

	const openExternalUrlPopover = useCallback(() => {
		endLocationRef.current = popSelectionSnapshot();
		setIsMenuOpen(false);
		setOpenPopover('url');
	}, [popSelectionSnapshot]);

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
				onClick: openExistingMediaPopover,
			},
			{
				displayText: 'Use external url',
				icon: 'link',
				onClick: openExternalUrlPopover,
			},
		],
		[uploadImage, openExternalUrlPopover, openExistingMediaPopover]
	);

	return (
		<MenuPopover items={menuItems} isOpen={isMenuOpen} onClose={closeMenu}>
			<ExternalUrlPopover
				isOpen={openPopover === 'url' && !isMenuOpen}
				onClose={closeAllPopovers}
				onConfirm={insertImage}
			>
				<ExistingImagePopover
					isOpen={openPopover === 'existing' && !isMenuOpen}
					onClose={closeAllPopovers}
					onConfirm={insertMedia}
				>
					<ToggleButton
						icon="media"
						onChange={openMenu}
						size="small"
						value={false}
					/>
				</ExistingImagePopover>
			</ExternalUrlPopover>
		</MenuPopover>
	);
};
