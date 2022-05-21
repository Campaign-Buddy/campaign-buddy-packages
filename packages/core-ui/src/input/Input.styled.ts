import { css } from 'styled-components';

export const baseInputStyles = css`
	background-color: ${({ theme }) => theme.legacyCoreUi.colors.inputBackground};
	color: ${({ theme }) => theme.legacyCoreUi.colors.text};
`;
