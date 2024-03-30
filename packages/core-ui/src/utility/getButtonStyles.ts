import { IButton } from '@campaign-buddy/themes';
import { css } from 'styled-components';

export const getButtonStyles = (button: IButton) => css`
	cursor: pointer;
	display: inline-flex;
	line-height: normal;
	align-items: center;
	outline: none;
	border: none;
	padding: ${button.sizing.padding.toCss()};
	min-height: ${button.sizing.height}px;
	max-height: ${button.sizing.height}px;
	min-width: ${button.sizing.minWidth}px;
	font-size: ${button.sizing.fontSize}px;
	gap: ${button.sizing.gap}px;
	border-radius: ${button.sizing.borderRadius.toCss()};
	background-color: ${button.states.default.background};
	box-shadow: ${button.states.default.shadow?.toCss() ?? 'none'};
	color: ${button.states.default.text};
	--cb-icon-color: ${button.states.default.text};

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
