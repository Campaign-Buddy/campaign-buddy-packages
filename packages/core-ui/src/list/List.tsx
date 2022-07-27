import React from 'react';
import { useTheme } from '@campaign-buddy/react-theme-provider';
import {
	StyledOrderedList,
	StyledUnorderedList,
	StyledListItem,
	StyledListItemText,
} from './List.styled';
import { IconName, Icon } from '../icon';

export interface ListProps {
	ordered?: boolean;
}

export function List({
	children,
	ordered,
}: React.PropsWithChildren<ListProps>) {
	const Component = ordered ? StyledOrderedList : StyledUnorderedList;
	return <Component>{children}</Component>;
}

export function ListItem({
	children,
}: React.PropsWithChildren<Record<string, unknown>>) {
	return <StyledListItem>{children}</StyledListItem>;
}

export interface ListItemTextProps {
	text: React.ReactNode;
}

export function ListItemText({ text }: ListItemTextProps) {
	return <StyledListItemText>{text}</StyledListItemText>;
}

export interface ListItemIconProps {
	icon: IconName;
}

export function ListItemIcon({ icon }: ListItemIconProps) {
	const theme = useTheme();

	return <Icon icon={icon} size={theme.list.item.iconSize} />;
}
