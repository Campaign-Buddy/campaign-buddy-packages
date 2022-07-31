import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { ContextMenu2 as ContextMenuCore } from '@blueprintjs/popover2';
import { MenuItem as MenuItemType } from './Menu';
import { StyledMenu, StyledMenuItem } from './Menu.styled';
import { defaultTheme } from '../theme';

const GlobalStyle = createGlobalStyle`
	.bp-overrides-context-menu-popover .bp4-menu {
		background-color: ${({ theme }) =>
			theme.legacyCoreUi.colors.background} !important;
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

export interface ContextMenuProps
	extends Omit<
		React.HTMLAttributes<HTMLElement>,
		'onContextMenu' | 'children'
	> {
	menuItems: MenuItemType[];
	as?: keyof JSX.IntrinsicElements;
}

export const ContextMenu = React.forwardRef<
	HTMLElement,
	React.PropsWithChildren<ContextMenuProps>
>(({ menuItems, children, as, ...props }, ref) => (
	<>
		<GlobalStyle />
		<ContextMenuCore
			tagName={as}
			{...props}
			ref={ref}
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
));
ContextMenu.displayName = 'ContextMenu';
