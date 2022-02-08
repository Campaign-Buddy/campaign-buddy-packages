import { StyledButton as ButtonCore } from '../button/Button.styled';
import styled, { createGlobalStyle } from 'styled-components';
import { defaultTheme } from '../theme';

export const GlobalStyle = createGlobalStyle`
	.campaign-buddy-select .bp3-transition-container {
		max-width: calc(100% - 10px);
	}

	.campaign-buddy-select .bp3-select-popover {
		padding: 4px;
		background-color: ${({ theme }) => theme.colors.background} !important;
		max-width: 100%;
	}

	.campaign-buddy-select .bp3-select-popover .bp3-popover-content {
		background-color: ${({ theme }) => theme.colors.background} !important;
	}

	.campaign-buddy-select .bp3-select-popover .bp3-input-group input {
		background-color: ${({ theme }) => theme.colors.inputBackground};
		color: ${({ theme }) => theme.colors.text};
	}

	.campaign-buddy-select .bp3-select-popover .bp3-input-group .bp3-icon {
		color: ${({ theme }) => theme.colors.text};
	}
`;
GlobalStyle.defaultProps = {
	theme: defaultTheme,
};

export const SelectButton = styled(ButtonCore)`
	background-color: ${({ theme }) => theme.colors.inputBackground} !important;
	box-shadow: inset 0 0 0 1px rgb(16 22 26 / 20%),
		inset 0 -1px 0 rgb(16 22 26 / 10%) !important;

	& .bp3-button-text {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;
SelectButton.defaultProps = {
	theme: defaultTheme,
};

export const NoResults = styled.i`
	color: ${({ theme }) => theme.colors.text};
	text-align: center;
	width: 100%;
	display: block;
	padding: 4px 0;
`;
NoResults.defaultProps = {
	theme: defaultTheme,
};
