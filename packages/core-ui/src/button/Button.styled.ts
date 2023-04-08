import styled, { css } from 'styled-components';
import { Button as ButtonCore } from '@blueprintjs/core';
import { defaultTheme } from '../theme';

export type ButtonStyle = 'primary' | 'minimal' | 'minimal-primary';

const primaryStyles = css`
	background-color: ${({ theme }) =>
		theme.legacyCoreUi.colors.primary} !important;
	color: ${({ theme }) => theme.legacyCoreUi.colors.background} !important;
	background-image: none !important;

	&:hover {
		background-color: ${({ theme }) =>
			theme.legacyCoreUi.colors.primaryHover} !important;
	}

	&:active {
		background-color: ${({ theme }) =>
			theme.legacyCoreUi.colors.primaryActive} !important;
	}
`;

const minimalPrimaryStyles = css`
	color: ${({ theme }) => theme.legacyCoreUi.colors.background} !important;

	& .bp4-icon {
		color: ${({ theme }) => theme.legacyCoreUi.colors.background} !important;
	}
`;

const minimalStyles = css`
	& .bp4-icon {
		color: ${({ theme }) => theme.legacyCoreUi.colors.text} !important;
	}

	color: ${({ theme }) => theme.legacyCoreUi.colors.text} !important;
`;

export const baseButtonStyles = css`
	outline: none;

	&.bp4-disabled {
		opacity: 0.5;
	}

	&:focus {
		box-shadow: 0 0 0 1px #137cbd, 0 0 0 3px rgb(19 124 189 / 30%),
			inset 0 1px 1px rgb(16 22 26 / 20%) !important;
	}

	&.bp4-minimal:hover {
		background-color: rgba(228, 222, 210, 0.7) !important;
	}

	&.bp4-minimal:active {
		background-color: rgba(228, 222, 210, 0.9) !important;
	}

	.bp4-spinner-head {
		stroke: currentColor !important;
	}
`;

export const StyledButton = styled(ButtonCore)<{ _style?: ButtonStyle }>`
	${({ _style }) => (_style === 'primary' || !_style) && primaryStyles}
	${baseButtonStyles}
	${({ _style }) => _style === 'minimal' && minimalStyles}
	${({ _style }) => _style === 'minimal-primary' && minimalPrimaryStyles}
`;

StyledButton.defaultProps = {
	theme: defaultTheme,
};

export const StyledToggleButton = styled(StyledButton)<{ isActive: boolean }>`
	color: ${({ isActive, theme }) =>
		isActive
			? theme.legacyCoreUi.colors.text
			: theme.legacyCoreUi.colors.textDisabled} !important;

	& .bp4-icon {
		color: ${({ isActive, theme }) =>
			isActive
				? theme.legacyCoreUi.colors.text
				: theme.legacyCoreUi.colors.textDisabled} !important;
	}
`;
