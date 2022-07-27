import React from 'react';
import {
	StyledOrderedList,
	StyledUnorderedList,
	StyledListItem,
} from './List.styled';

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
	return <span>{text}</span>;
}
