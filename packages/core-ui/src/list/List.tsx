import React, { useCallback, useRef } from 'react';
import { useTheme } from '@campaign-buddy/react-theme-provider';
import {
	StyledOrderedList,
	StyledUnorderedList,
	StyledListItem,
	StyledListItemText,
	StyledContextMenuListItem,
} from './List.styled';
import { IconName, Icon } from '../icon';
import { ToggleButton } from '../button';
import { MenuItem } from '../menu';
import { useCombinedRefs } from '@campaign-buddy/common-hooks';

/**
 * Prevents clicks and key events on
 * ListItemIconButton children from
 * propagating to the parent ListItem
 */
const shallowEventControl = {
	wasEventHandled: false,
};

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
	contextMenuItems?: MenuItem[];
}

export const ListItem = React.forwardRef<
	HTMLLIElement,
	React.PropsWithChildren<ListItemProps>
>(
	(
		{
			children,
			onClick,
			contextMenuItems,
		}: React.PropsWithChildren<ListItemProps>,
		ref
	) => {
		const listItemRef = useRef<HTMLLIElement | null>(null);
		const combinedRefs = useCombinedRefs(listItemRef, ref);

		const shallowClickHandler = useCallback(
			(e: React.SyntheticEvent) => {
				if (!shallowEventControl.wasEventHandled) {
					onClick?.(e);
				}
				shallowEventControl.wasEventHandled = false;
			},
			[onClick]
		);

		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent) => {
				if (e.key === 'Enter' && e.target === listItemRef.current) {
					shallowClickHandler(e);
				}
			},
			[shallowClickHandler]
		);

		const commonProps = {
			ref: combinedRefs,
			isInteractive: Boolean(onClick),
			tabIndex: onClick ? 0 : -1,
			role: onClick && 'button',
			onClick: onClick && shallowClickHandler,
			onKeyDown: onClick && handleKeyDown,
		};

		if (contextMenuItems) {
			return (
				<StyledContextMenuListItem
					{...commonProps}
					menuItems={contextMenuItems}
				>
					{children}
				</StyledContextMenuListItem>
			);
		}
		return <StyledListItem {...commonProps}>{children}</StyledListItem>;
	}
);

ListItem.displayName = 'displayName';

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

export interface ListItemIconButtonProps {
	icon: IconName;
	onClick: () => void;
}

export function ListItemIconButton({ icon, onClick }: ListItemIconButtonProps) {
	const shallowClickHandler = useCallback(() => {
		shallowEventControl.wasEventHandled = true;
		onClick();
	}, [onClick]);
	return (
		<ToggleButton
			icon={icon}
			size="small"
			value
			onChange={shallowClickHandler}
		/>
	);
}
