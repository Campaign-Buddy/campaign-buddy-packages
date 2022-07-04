import React from 'react';
import { IconName, MaybeElement } from '@blueprintjs/core';
import { Popover2 as Popover } from '@blueprintjs/popover2';
import { createGlobalStyle } from 'styled-components';
import {
	StyledMenuItem,
	StyledMenu,
	MenuItemContent,
	MenuItemText,
} from './Menu.styled';
import { defaultTheme } from '../theme';

const GlobalStyle = createGlobalStyle`
	.bp-overrides-menu-popover .bp4-menu {
		background-color: ${({ theme }) =>
			theme.legacyCoreUi.colors.background} !important;
	}
`;
GlobalStyle.defaultProps = {
	theme: defaultTheme,
};

export interface MenuItem<T = any> {
	displayText?: string;
	icon?: IconName | MaybeElement;
	renderRightElement?: () => React.ReactNode;
	subItems?: MenuItem[];
	onClick?: () => void;
	shouldCloseMenuOnClick?: boolean;
	itemData?: T;
}

interface MenuItemProps<T = any> {
	item: MenuItem<T>;
	verticalPadding?: number;
	iconMargin?: number;
	isActive?: boolean;
}

export interface MenuItemRenderApi<T = any> {
	MenuItem: React.ComponentType<MenuItemProps<T>>;
	item: MenuItem<T>;
	closeMenu: () => void;
}

interface MenuProps<T = any> {
	items: MenuItem<T>[];
	onClose: () => void;
	renderMenuItem?: (api: MenuItemRenderApi) => React.ReactNode;
}

const popoverProps = {
	popoverClassName: 'bp-overrides-menu-popover',
};

function MenuItem<T = any>({
	item,
	verticalPadding,
	isActive,
	iconMargin,
}: MenuItemProps<T>): JSX.Element {
	return (
		<StyledMenuItem
			verticalPadding={verticalPadding}
			icon={item.icon}
			text={
				<MenuItemContent>
					<MenuItemText>{item.displayText}</MenuItemText>
					{item.renderRightElement && <span>{item.renderRightElement()}</span>}
				</MenuItemContent>
			}
			onClick={item.onClick}
			popoverProps={popoverProps}
			tagName="button"
			shouldDismissPopover={item.shouldCloseMenuOnClick ?? true}
			selected={isActive}
			iconMargin={iconMargin}
		>
			{item?.subItems?.map((subItem) => (
				<MenuItem key={subItem.displayText} item={subItem} />
			))}
		</StyledMenuItem>
	);
}

export function Menu<T = any>({
	items,
	renderMenuItem,
	onClose,
}: MenuProps<T>): JSX.Element {
	return (
		<StyledMenu>
			{items.map((item) =>
				renderMenuItem ? (
					<div key={item.displayText}>
						{renderMenuItem({ MenuItem, item, closeMenu: onClose })}
					</div>
				) : (
					<MenuItem key={item.displayText} item={item} />
				)
			)}
		</StyledMenu>
	);
}

interface MenuPopoverProps<T = any> extends MenuProps<T> {
	isOpen: boolean;
}

export function MenuPopover<T = any>({
	items,
	children,
	isOpen,
	renderMenuItem,
	onClose,
}: React.PropsWithChildren<MenuPopoverProps<T>>) {
	return (
		<>
			<GlobalStyle />
			<Popover
				content={
					<Menu
						onClose={onClose}
						renderMenuItem={renderMenuItem}
						items={items}
					/>
				}
				isOpen={isOpen}
				onClose={onClose}
				placement="bottom-start"
				minimal
				openOnTargetFocus={false}
				autoFocus
				popoverClassName="bp-overrides-menu-popover"
			>
				{children}
			</Popover>
		</>
	);
}
