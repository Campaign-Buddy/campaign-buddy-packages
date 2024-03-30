import { Button as ButtonCore } from '../button';
import styled, { createGlobalStyle } from 'styled-components';
import { defaultTheme } from '../theme';

export const GlobalStyle = createGlobalStyle`
	.campaign-buddy-select .bp4-transition-container {
		max-width: calc(100% - 10px);
	}

	.campaign-buddy-select .bp4-select-popover {
		padding: ${({ theme }) => theme.select.menu.padding.toCss()};
		background-color: ${({ theme }) =>
			theme.select.menu.backgroundColor} !important;
		max-width: 100%;
		box-shadow: ${({ theme }) => theme.select.menu.dropShadow.toCss()} !important;
	}

	.campaign-buddy-select .bp4-select-popover .bp4-popover-content {
		background-color: ${({ theme }) =>
			theme.select.menu.backgroundColor} !important;
	}

	.campaign-buddy-select .bp4-select-popover .bp4-input-group input {
		background-color: ${({ theme }) => theme.select.backgroundColor};
		color: ${({ theme }) => theme.select.textColor};
	}

	.campaign-buddy-select .bp4-select-popover .bp4-input-group .bp4-icon {
		color: ${({ theme }) => theme.select.textColor} !important;
	}
`;
GlobalStyle.defaultProps = {
	theme: defaultTheme,
};

export const SelectButton = styled(ButtonCore)`
	background-color: ${({ theme }) => theme.select.backgroundColor} !important;
	box-shadow: inset 0 0 0 1px rgb(16 22 26 / 20%),
		inset 0 -1px 0 rgb(16 22 26 / 10%) !important;

	& .bp4-button-text {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;
SelectButton.defaultProps = {
	theme: defaultTheme,
};

export const NoResults = styled.i`
	color: ${({ theme }) => theme.select.textColor};
	text-align: center;
	width: 100%;
	display: block;
	padding: 4px 0;
`;
NoResults.defaultProps = {
	theme: defaultTheme,
};
