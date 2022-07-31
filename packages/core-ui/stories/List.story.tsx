import React from 'react';
import { List, ListItem, ListItemText } from '../src';
import { ListItemIcon, ListItemIconButton } from '../src/list/List';

export default {
	title: 'core-ui/List',
};

export const Primary = () => (
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
		</ListItem>
		<ListItem onClick={() => console.log('???')}>
			<ListItemIcon icon="blank" />
			<ListItemText text="Super duper duper duper duper duper duper long" />
			<ListItemIconButton icon="menu" onClick={() => console.log('ICON!')} />
		</ListItem>
	</List>
);
