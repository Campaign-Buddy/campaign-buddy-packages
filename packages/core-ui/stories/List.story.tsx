import React from 'react';
import { List, ListItem, ListItemText } from '../src';
import { ListItemIcon } from '../src/list/List';

export default {
	title: 'core-ui/List',
};

export const Primary = () => (
	<List>
		<ListItem>
			<ListItemIcon icon="bold" />
			<ListItemText text="Bread" />
			<ListItemIcon icon="tick" />
		</ListItem>
		<ListItem>
			<ListItemIcon icon="database" />
			<ListItemText text="Milk" />
		</ListItem>
		<ListItem>
			<ListItemIcon icon="blank" />
			<ListItemText text="Cheese" />
		</ListItem>
		<ListItem>
			<ListItemIcon icon="blank" />
			<ListItemText text="Super duper duper duper duper duper duper long" />
		</ListItem>
	</List>
);
