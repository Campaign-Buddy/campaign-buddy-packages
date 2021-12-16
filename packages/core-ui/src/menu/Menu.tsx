import React from 'react';
import { IconName } from '@blueprintjs/core';
import { Popover2 as Popover } from '@blueprintjs/popover2';
import { createGlobalStyle } from 'styled-components';
import { StyledMenuItem, StyledMenu } from './Menu.styled';
import { defaultTheme } from '../theme';

const GlobalStyle = createGlobalStyle`
	.bp-overrides-popover .bp3-menu {
		background-color: ${({ theme }) => theme.colors.background} !important;
	}

	.bp-overrides-icon-popover .bp3-menu {
		min-width: unset !important;

		.bp3-menu-item .bp3-icon {
			margin: 0 !important;
		}
	}
`;
GlobalStyle.defaultProps = {
	theme: defaultTheme,
};

export interface MenuItem {
	displayText?: string;
	icon?: IconName;
	subItems?: MenuItem[];
	onClick?: () => void;
}

interface MenuProps {
	items: MenuItem[];
}

const popoverProps = {
	popoverClassName: 'bp-overrides-popover',
};

function MenuItem({ item }: { item: MenuItem }): JSX.Element {
	return (
		<StyledMenuItem
			icon={item.icon}
			text={item.displayText}
			onClick={item.onClick}
			popoverProps={popoverProps}
			tagName="button"
		>
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

interface MenuPopoverProps extends MenuProps {
	isOpen: boolean;
	onClose: () => void;
}

export const MenuPopover: React.FC<MenuPopoverProps> = ({
	items,
	children,
	isOpen,
	onClose,
}) => {
	return (
		<>
			<GlobalStyle />
			<Popover
				content={<Menu items={items} />}
				isOpen={isOpen}
				onClose={onClose}
				placement="bottom-start"
				minimal
				openOnTargetFocus={false}
				autoFocus
				popoverClassName="bp-overrides-popover"
			>
				{children}
			</Popover>
		</>
	);
};
