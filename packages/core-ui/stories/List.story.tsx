import React from 'react';
import { List, ListItem, ListItemText } from '../src';

export default {
	title: 'core-ui/List',
};

export const Primary = () => (
	<List>
		<ListItem>
			<ListItemText text="Bread" />
		</ListItem>
		<ListItem>
			<ListItemText text="Milk" />
		</ListItem>
		<ListItem>
			<ListItemText text="Cheese" />
		</ListItem>
		<ListItem>
			<ListItemText text="Eggs" />
		</ListItem>
	</List>
);
