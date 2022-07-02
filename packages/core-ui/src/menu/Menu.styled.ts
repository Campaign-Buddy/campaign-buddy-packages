import { Menu as MenuCore, MenuItem as MenuItemCore } from '@blueprintjs/core';
import styled from 'styled-components';
import { defaultTheme } from '../theme';

export const StyledMenu = styled(MenuCore)`
	background-color: ${({ theme }) => theme.legacyCoreUi.colors.background};
	max-width: 95vw;
`;
StyledMenu.defaultProps = {
	theme: defaultTheme,
};

export const MenuItemContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const MenuItemText = styled.span`
	line-height: initial;
`;

export const StyledMenuItem = styled(MenuItemCore)<{
	verticalPadding?: number;
}>`
	${({ verticalPadding }) =>
		typeof verticalPadding === 'number' &&
		`
		padding-top: ${verticalPadding}px !important;
		padding-bottom: ${verticalPadding}px !important;
	`}
	color: ${({ theme }) => theme.legacyCoreUi.colors.text} !important;

	.bp4-icon {
		color: ${({ theme }) => theme.legacyCoreUi.colors.text} !important;
	}

	&.bp4-active {
		background-color: ${({ theme }) =>
			theme.legacyCoreUi.colors.primary} !important;
		color: ${({ theme }) => theme.legacyCoreUi.colors.background} !important;

		.bp4-icon {
			color: ${({ theme }) => theme.legacyCoreUi.colors.background} !important;
		}
	}
`;
StyledMenuItem.defaultProps = {
	theme: defaultTheme,
};
