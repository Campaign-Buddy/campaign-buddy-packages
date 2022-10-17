import React, { useState } from 'react';
import { useBooleanState } from '@campaign-buddy/common-hooks';
import {
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemIconButton,
	MenuPopover,
	MenuItem,
	ListItemShallowClickArea,
	ListItemInput,
} from '../src';

export default {
	title: 'core-ui/List',
};

export const Primary = () => {
	const [isMenuOpen, openMenu, closeMenu] = useBooleanState(false);

	const [input, setInput] = useState('Im editable');

	const menuItems: MenuItem[] = [
		{
			displayText: 'Delete',
			icon: 'trash',
		},
		{
			displayText: 'Rename',
			icon: 'edit',
		},
	];

	return (
		<List>
			<ListItem onClick={() => console.log('bread :p')}>
				<ListItemIcon icon="bold" />
				<ListItemText text="Bread" />
				<ListItemIcon icon="tick" />
			</ListItem>
			<ListItem onClick={() => console.log('milk :p')}>
				<ListItemIcon icon="database" />
				<ListItemText text="Milk" />
			</ListItem>
			<ListItem
				contextMenuItems={menuItems}
				onClick={() => console.log('cheese :p')}
			>
				<ListItemIcon icon="blank" />
				<ListItemText text="Cheese" />
				<ListItemShallowClickArea>
					<MenuPopover
						items={menuItems}
						isOpen={isMenuOpen}
						onClose={closeMenu}
					>
						<ListItemIconButton icon="menu" onClick={openMenu} />
					</MenuPopover>
				</ListItemShallowClickArea>
			</ListItem>
			<ListItem onClick={() => console.log('???')}>
				<ListItemIcon icon="blank" />
				<ListItemText text="Super duper duper duper duper duper duper long" />
			</ListItem>
			<ListItem>
				<ListItemInput value={input} onChange={setInput} />
			</ListItem>
			<ListItem onClick={() => console.log('image icon!')}>
				<ListItemIcon
					icon={{ kind: 'image', src: 'https://picsum.photos/75/100' }}
				/>
				<ListItemText text="Image icon!" />
			</ListItem>
		</List>
	);
};
