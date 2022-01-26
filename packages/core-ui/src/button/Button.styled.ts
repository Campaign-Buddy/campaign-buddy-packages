import styled, { css } from 'styled-components';
import { Button as ButtonCore } from '@blueprintjs/core';
import { defaultTheme } from '../theme';

export type ButtonStyle = 'primary' | 'minimal';

const primaryStyles = css`
	background-color: ${({ theme }) => theme.colors.primary} !important;
	color: ${({ theme }) => theme.colors.background} !important;
	background-image: none !important;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primaryHover} !important;
	}

	&:active {
		background-color: ${({ theme }) => theme.colors.primaryActive} !important;
	}
`;

export const StyledButton = styled(ButtonCore)<{ _style?: ButtonStyle }>`
	${({ _style }) => (_style === 'primary' || !_style) && primaryStyles}

	outline: none;

	& .bp3-icon {
		color: ${({ theme }) => theme.colors.text} !important;
	}

	&.bp3-minimal {
		color: ${({ theme }) => theme.colors.text} !important;
	}

	&.bp3-disabled {
		opacity: 0.5;
	}

	&:focus {
		box-shadow: 0 0 0 1px #137cbd, 0 0 0 3px rgb(19 124 189 / 30%),
			inset 0 1px 1px rgb(16 22 26 / 20%) !important;
	}

	&.bp3-minimal:hover {
		background-color: rgba(228, 222, 210, 0.7) !important;
	}

	&.bp3-minimal:active {
		background-color: rgba(228, 222, 210, 0.9) !important;
	}
`;

StyledButton.defaultProps = {
	theme: defaultTheme,
};

export const StyledToggleButton = styled(StyledButton)<{ isActive: boolean }>`
	color: ${({ isActive, theme }) =>
		isActive ? theme.colors.text : theme.colors.textDisabled} !important;

	& .bp3-icon {
		color: ${({ isActive, theme }) =>
			isActive ? theme.colors.text : theme.colors.textDisabled} !important;
	}
`;
