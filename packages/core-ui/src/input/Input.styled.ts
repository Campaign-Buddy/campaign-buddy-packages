import { css } from 'styled-components';

export const baseInputStyles = css`
	background-color: ${({ theme }) => theme.input.base.backgroundColor};
	color: ${({ theme }) => theme.input.base.textColor};
`;
