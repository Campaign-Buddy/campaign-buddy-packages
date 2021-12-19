import { ToggleButton, MenuPopover, MenuItem } from '@campaign-buddy/core-ui';
import React, { useCallback, useMemo, useState } from 'react';
import { useSelectionSnapshot } from '../editor-util';

export const AddImageButton: React.FC = () => {
	const { pushSelectionSnapshot, popSelectionSnapshot } =
		useSelectionSnapshot();

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

	const menuItems = useMemo<MenuItem[]>(
		() => [
			{
				displayText: 'Upload image',
				icon: 'upload',
				onClick: () => setOpenPopover('none'),
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
		[]
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
