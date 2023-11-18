import styled, { css } from 'styled-components';
import { IButton } from '@campaign-buddy/themes';
import { defaultTheme } from '../theme';

export type ButtonStyle = 'primary' | 'minimal';

const getButtonStyles = (button: IButton) => css`
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	outline: none;
	border: none;
	padding: ${button.sizing.padding.toCss()};
	min-height: ${button.sizing.height}px;
	max-height: ${button.sizing.height}px;
	min-width: ${button.sizing.minWidth}px;
	font-size: ${button.sizing.fontSize}px;
	border-radius: ${button.sizing.borderRadius.toCss()};
	background-color: ${button.states.default.background};
	box-shadow: ${button.states.default.shadow?.toCss() ?? 'none'};
	color: ${button.states.default.text};

	& .bp4-icon {
		--cb-icon-color: ${button.states.default.text};
	}

	&:hover {
		background-color: ${button.states.hover.background};
		color: ${button.states.hover.text};
		box-shadow: ${button.states.hover.shadow?.toCss() ?? 'none'};
		--cb-icon-color: ${button.states.hover.text};
	}

	&:active {
		background-color: ${button.states.active.background};
		color: ${button.states.active.text};
		box-shadow: ${button.states.active.shadow?.toCss() ?? 'none'};
		--cb-icon-color: ${button.states.active.text};
	}

	&:disabled {
		background-color: ${button.states.disabled.background};
		color: ${button.states.disabled.text};
		box-shadow: ${button.states.disabled.shadow?.toCss() ?? 'none'};
		--cb-icon-color: ${button.states.disabled.text};
	}

	&:focus {
		box-shadow: ${button.states.focus.shadow?.toCss() ?? 'none'};
	}

	.bp4-spinner-head {
		stroke: currentColor !important;
	}
`;

export const RightIconContainer = styled.span`
	margin-left: auto;
`;

export const baseButtonStyles = css`
	${({ theme }) => getButtonStyles(theme.buttons.primary.normal)}
`;

export const StyledButton = styled.button<{
	variant?: ButtonStyle | IButton;
	size?: 'large' | 'small' | 'normal';
	fill?: boolean;
}>`
	${({ variant, theme, size }) => {
		console.log(
			'styled button',
			variant,
			typeof variant === 'string' || !variant
				? theme.buttons[variant ?? 'primary'][size ?? 'normal']
				: variant
		);
		return typeof variant === 'string' || !variant
			? getButtonStyles(theme.buttons[variant ?? 'primary'][size ?? 'normal'])
			: getButtonStyles(variant);
	}}

	${({ fill }) => fill && 'width: 100%;'}
`;

StyledButton.defaultProps = {
	theme: defaultTheme,
};

export const StyledToggleButton = styled(StyledButton)<{ isActive: boolean }>`
	color: ${({ isActive, theme }) =>
		isActive
			? theme.legacyCoreUi.colors.text
			: theme.legacyCoreUi.colors.textDisabled} !important;

	&:active,
	&:focus,
	&:hover {
		color: ${({ isActive, theme }) =>
			isActive
				? theme.legacyCoreUi.colors.text
				: theme.legacyCoreUi.colors.textDisabled} !important;
		--cb-icon-color: ${({ isActive, theme }) =>
			isActive
				? theme.legacyCoreUi.colors.text
				: theme.legacyCoreUi.colors.textDisabled};
	}
`;
