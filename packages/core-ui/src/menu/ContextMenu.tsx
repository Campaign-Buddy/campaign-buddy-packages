import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { ContextMenu2 as ContextMenuCore } from '@blueprintjs/popover2';
import { MenuItem as MenuItemType } from './Menu';
import { StyledMenu, StyledMenuItem } from './Menu.styled';
import { defaultTheme } from '../theme';

const GlobalStyle = createGlobalStyle`
	.bp-overrides-context-menu-popover .bp3-menu {
		background-color: ${({ theme }) => theme.colors.background} !important;
	}
`;
GlobalStyle.defaultProps = {
	theme: defaultTheme,
};

const popoverProps = {
	popoverClassName: 'bp-overrides-context-menu-popover',
	hasBackdrop: false,
};

function MenuItem({ item }: { item: MenuItemType }): JSX.Element {
	return (
		<StyledMenuItem
			icon={item.icon}
			text={item.displayText}
			onClick={item.onClick}
			popoverProps={popoverProps}
			tagName="button"
			shouldDismissPopover={item.shouldCloseMenuOnClick}
		>
			{item?.subItems?.map((subItem) => (
				<MenuItem key={subItem.displayText} item={subItem} />
			))}
		</StyledMenuItem>
	);
}

interface ContextMenuProps {
	menuItems: MenuItemType[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
	menuItems,
	children,
}) => (
	<>
		<GlobalStyle />
		<ContextMenuCore
			content={
				<StyledMenu>
					{menuItems.map((x, i) => (
						<MenuItem item={x} key={x.displayText ?? i} />
					))}
				</StyledMenu>
			}
		>
			{children}
		</ContextMenuCore>
	</>
);
