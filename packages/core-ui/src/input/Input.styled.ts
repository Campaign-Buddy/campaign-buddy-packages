import { css } from 'styled-components';

export const baseInputStyles = css`
	background-color: ${({ theme }) => theme.colors.inputBackground};
	color: ${({ theme }) => theme.colors.text};
`;
