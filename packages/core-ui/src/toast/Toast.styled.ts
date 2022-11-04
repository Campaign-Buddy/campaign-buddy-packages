import { createGlobalStyle } from 'styled-components';
import { baseButtonStyles } from '../button/Button.styled';

export const GlobalToastStyles = createGlobalStyle`
	.bp4-toast {
		background-color: ${({ theme }) => theme.legacyCoreUi.colors.background};
		color: ${({ theme }) => theme.legacyCoreUi.colors.text};
	}

	.bp4-button {
		${baseButtonStyles}
	}
`;
