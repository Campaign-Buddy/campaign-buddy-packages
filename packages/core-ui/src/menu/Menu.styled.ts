import { Menu as MenuCore, MenuItem as MenuItemCore } from '@blueprintjs/core';
import styled from 'styled-components';
import { defaultTheme } from '../theme';

export const StyledMenu = styled(MenuCore)`
	background-color: ${({ theme }) => theme.colors.background};
`;
StyledMenu.defaultProps = {
	theme: defaultTheme,
};

export const StyledMenuItem = styled(MenuItemCore)`
	color: ${({ theme }) => theme.colors.text};

	&:hover {
		color: ${({ theme }) => theme.colors.text};
	}

	&.bp3-active {
		background-color: ${({ theme }) => theme.colors.primary} !important;
		color: ${({ theme }) => theme.colors.background} !important;
	}
`;
StyledMenuItem.defaultProps = {
	theme: defaultTheme,
};
