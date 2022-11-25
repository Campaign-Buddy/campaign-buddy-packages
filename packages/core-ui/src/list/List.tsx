import React, { useCallback, useRef } from 'react';
import { useTheme } from '@campaign-buddy/react-theme-provider';
import { useCombinedRefs } from '@campaign-buddy/common-hooks';
import {
	StyledOrderedList,
	StyledUnorderedList,
	StyledListItem,
	StyledListItemText,
	StyledContextMenuListItem,
	listItemClass,
	StyledEditableText,
	EditableTextContainer,
} from './List.styled';
import { IconName, Icon } from '../icon';
import { ToggleButton } from '../button';
import { MenuItem } from '../menu';
import { CampaignBuddyIcon } from '../icon/IconType';
import {
	ListItemFocusManager,
	ListItemFocusStateProvider,
	useCanParentListItemReceiveFocus,
	useListItemFocus,
} from './ListItemFocusManager';

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
	return (
		<ListItemFocusManager>
			<Component>{children}</Component>
		</ListItemFocusManager>
	);
}

export interface ListItemProps {
	onClick?: (e: React.SyntheticEvent) => void;
	disabled?: boolean;
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
			disabled,
			contextMenuItems,
		}: React.PropsWithChildren<ListItemProps>,
		ref
	) => {
		const listItemRef = useRef<HTMLLIElement | null>(null);
		const combinedRefs = useCombinedRefs(listItemRef, ref);
		const { id, canReceiveFocus } = useListItemFocus();

		const shallowClickHandler = useCallback(
			(e: React.SyntheticEvent) => {
				if (!shallowEventControl.wasEventHandled && !disabled) {
					onClick?.(e);
				}
				shallowEventControl.wasEventHandled = false;
			},
			[onClick, disabled]
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
			tabIndex: canReceiveFocus ? 0 : -1,
			role: onClick && 'button',
			onClick: onClick && shallowClickHandler,
			onKeyDown: onClick && handleKeyDown,
			className: listItemClass,
			id,
			disabled,
		};

		if (contextMenuItems) {
			return (
				<ListItemFocusStateProvider canReceiveFocus={canReceiveFocus}>
					<StyledContextMenuListItem
						{...commonProps}
						menuItems={contextMenuItems}
					>
						{children}
					</StyledContextMenuListItem>
				</ListItemFocusStateProvider>
			);
		}
		return (
			<ListItemFocusStateProvider canReceiveFocus={canReceiveFocus}>
				<StyledListItem {...commonProps}>{children}</StyledListItem>
			</ListItemFocusStateProvider>
		);
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
	icon: CampaignBuddyIcon;
}

export function ListItemIcon({ icon }: ListItemIconProps) {
	const theme = useTheme();

	return <Icon icon={icon} size={theme.list.item.iconSize} />;
}

interface ListItemShallowClickAreaProps
	extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick' | 'onKeyDown'> {
	as?: keyof JSX.IntrinsicElements;
}

/**
 * Any clicks within the children of this component
 * will not propagate to the parent ListItem but *will*
 * propagate to other ancestors. Not required for
 * ListItemIconButton
 */
export function ListItemShallowClickArea({
	children,
	as: Component = 'div',
	...props
}: ListItemShallowClickAreaProps) {
	const shallowClickHandler = useCallback(() => {
		shallowEventControl.wasEventHandled = true;
	}, []);

	const AnyComponent = Component as any;

	return (
		<AnyComponent
			onClick={shallowClickHandler}
			onKeyDown={shallowClickHandler}
			{...props}
		>
			{children}
		</AnyComponent>
	);
}

export interface ListItemInputProps {
	value: string;
	onChange: (value: string) => void;
	onCommit?: () => void;
	onCancel?: () => void;
	placeholderText?: string;
	selectAllOnFocus?: boolean;
}

export function ListItemInput({
	value,
	onChange,
	onCommit,
	onCancel,
	placeholderText,
	selectAllOnFocus,
}: ListItemInputProps) {
	const shallowClickHandler = useCallback(() => {
		shallowEventControl.wasEventHandled = true;
	}, []);

	return (
		<EditableTextContainer>
			<div onClick={shallowClickHandler}>
				<StyledEditableText
					isEditing
					value={value}
					onChange={onChange}
					placeholder={placeholderText}
					onConfirm={onCommit}
					onCancel={onCancel}
					selectAllOnFocus={selectAllOnFocus}
				/>
			</div>
		</EditableTextContainer>
	);
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

	const canReceiveFocus = useCanParentListItemReceiveFocus();

	return (
		<ToggleButton
			icon={icon}
			size="small"
			value
			onChange={shallowClickHandler}
			tabIndex={canReceiveFocus ? 0 : -1}
		/>
	);
}
