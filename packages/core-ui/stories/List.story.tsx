import React from 'react';
import { useBooleanState } from '@campaign-buddy/common-hooks';
import {
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemIconButton,
	MenuPopover,
} from '../src';

export default {
	title: 'core-ui/List',
};

export const Primary = () => {
	const [isMenuOpen, openMenu, closeMenu] = useBooleanState(false);

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
			<ListItem onClick={() => console.log('cheese :p')}>
				<ListItemIcon icon="blank" />
				<ListItemText text="Cheese" />
				<MenuPopover
					items={[
						{
							displayText: 'Delete',
							icon: 'trash',
						},
						{
							displayText: 'Rename',
							icon: 'edit',
						},
					]}
					isOpen={isMenuOpen}
					onClose={closeMenu}
				>
					<ListItemIconButton icon="menu" onClick={openMenu} />
				</MenuPopover>
			</ListItem>
			<ListItem onClick={() => console.log('???')}>
				<ListItemIcon icon="blank" />
				<ListItemText text="Super duper duper duper duper duper duper long" />
			</ListItem>
		</List>
	);
};
