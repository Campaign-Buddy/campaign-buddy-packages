import styled, { css } from 'styled-components';
import { IButton } from '@campaign-buddy/themes/src/components';
import { defaultTheme } from '../theme';

export type ButtonStyle = 'primary' | 'minimal';

const getButtonStyles = (button: IButton) => `
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
		color: ${button.states.default.text} !important;
	}

	&:hover {
		background-color: ${button.states.hover.background};
		color: ${button.states.hover.text};
		box-shadow: ${button.states.hover.shadow?.toCss() ?? 'none'};

		& .bp4-icon {
			color: ${button.states.hover.text} !important;
		}
	}

	&:active {
		background-color: ${button.states.active.background};
		color: ${button.states.active.text};
		box-shadow: ${button.states.active.shadow?.toCss() ?? 'none'};

		& .bp4-icon {
			color: ${button.states.active.text} !important;
		}
	}

	&:disabled {
		background-color: ${button.states.disabled.background};
		color: ${button.states.disabled.text};
		box-shadow: ${button.states.disabled.shadow?.toCss() ?? 'none'};

		& .bp4-icon {
			color: ${button.states.disabled.text} !important;
		}
	}

	&:focus {
		box-shadow: ${button.states.focus.shadow?.toCss() ?? 'none'};
	}

	.bp4-spinner-head {
		stroke: currentColor !important;
	}
`;

export const baseButtonStyles = css`
	${({ theme }) => getButtonStyles(theme.buttons.primary.normal)}
`;

export const StyledButton = styled.button<{
	_style?: ButtonStyle | IButton;
	size?: 'large' | 'small' | 'normal';
}>`
	${({ _style, theme, size }) =>
		typeof _style === 'string' || !_style
			? getButtonStyles(theme.buttons[_style ?? 'primary'][size ?? 'normal'])
			: getButtonStyles(_style)}
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
