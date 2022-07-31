import React, { useCallback } from 'react';
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

export interface ListItemProps {
	onClick?: (e: React.SyntheticEvent) => void;
}

export function ListItem({
	children,
	onClick,
}: React.PropsWithChildren<ListItemProps>) {
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Enter') {
				onClick?.(e);
			}
		},
		[onClick]
	);

	return (
		<StyledListItem
			isInteractive={Boolean(onClick)}
			tabIndex={onClick ? 0 : -1}
			role={onClick && 'button'}
			onClick={onClick}
			onKeyDown={onClick && handleKeyDown}
		>
			{children}
		</StyledListItem>
	);
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
