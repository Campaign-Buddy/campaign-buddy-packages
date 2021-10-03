import React from 'react';
import { IconName } from '@blueprintjs/core';
import { StyledMenuItem, StyledMenu } from './Menu.styled';

interface MenuItem {
	displayText: string;
	icon?: IconName;
	subItems?: MenuItem[];
	onClick?: () => void;
}

interface MenuProps {
	items: MenuItem[];
}

function MenuItem({ item }: { item: MenuItem }): JSX.Element {
	return (
		<StyledMenuItem>
			{item?.subItems?.map((subItem) => (
				<MenuItem key={subItem.displayText} item={subItem} />
			))}
		</StyledMenuItem>
	);
}

export function Menu({ items }: MenuProps): JSX.Element {
	return (
		<StyledMenu>
			{items.map((item) => (
				<MenuItem key={item.displayText} item={item} />
			))}
		</StyledMenu>
	);
}
