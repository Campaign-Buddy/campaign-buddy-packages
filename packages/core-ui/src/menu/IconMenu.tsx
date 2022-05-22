import React from 'react';
import { IconName } from '@blueprintjs/icons';
import { Popover2 as Popover } from '@blueprintjs/popover2';
import { createGlobalStyle } from 'styled-components';
import { StyledMenu, StyledMenuItem } from './Menu.styled';
import { defaultTheme } from '../theme';

const GlobalStyle = createGlobalStyle`
	.bp-overrides-icon-popover .bp3-menu {
		background-color: ${({ theme }) =>
			theme.legacyCoreUi.colors.background} !important;
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

export interface IconMenuItem {
	icon: IconName;
	onClick?: () => void;
	altText: string;
	shouldCloseMenuOnClick?: boolean;
}

const popoverProps = {
	popoverClassName: 'bp-overrides-icon-popover',
};

function IconMenuItem({ item }: { item: IconMenuItem }): JSX.Element {
	return (
		<StyledMenuItem
			icon={item.icon}
			onClick={item.onClick}
			popoverProps={popoverProps}
			tagName="button"
			aria-label={item.altText}
			shouldDismissPopover={item.shouldCloseMenuOnClick ?? true}
		/>
	);
}

interface IconMenuProps {
	items: IconMenuItem[];
}

function IconMenu({ items }: IconMenuProps): JSX.Element {
	return (
		<StyledMenu>
			{items.map((item) => (
				<IconMenuItem key={item.altText} item={item} />
			))}
		</StyledMenu>
	);
}

interface IconMenuPopoverProps extends IconMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

export const IconMenuPopover: React.FC<
	React.PropsWithChildren<IconMenuPopoverProps>
> = ({ items, children, isOpen, onClose }) => {
	return (
		<>
			<GlobalStyle />
			<Popover
				content={<IconMenu items={items} />}
				isOpen={isOpen}
				onClose={onClose}
				placement="bottom-start"
				minimal
				openOnTargetFocus={false}
				autoFocus
				popoverClassName="bp-overrides-icon-popover"
			>
				{children}
			</Popover>
		</>
	);
};
