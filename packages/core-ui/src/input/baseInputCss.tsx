import { css } from 'styled-components';
import { baseInputStyles } from './Input.styled';

const focusedStyles = css`
	box-shadow: 0 0 0 1px #137cbd, 0 0 0 3px rgb(19 124 189 / 30%),
		inset 0 1px 1px rgb(16 22 26 / 20%) !important;
`;

export const baseInputCss = css`
	${baseInputStyles};

	cursor: text;
	border-radius: 3px;
	padding: 10px;
	flex: 1 1 auto;
	width: 100%;
	box-shadow: 0 0 0 0 rgb(19 124 189 / 0%), 0 0 0 0 rgb(19 124 189 / 0%),
		inset 0 0 0 1px rgb(16 22 26 / 15%), inset 0 1px 1px rgb(16 22 26 / 20%);
	transition: box-shadow 100ms cubic-bezier(0.4, 1, 0.75, 0.9),
		-webkit-box-shadow 100ms cubic-bezier(0.4, 1, 0.75, 0.9);

	&:focus-within {
		${focusedStyles}
	}
`;
