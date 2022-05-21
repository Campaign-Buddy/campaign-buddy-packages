import styled from 'styled-components';
import { defaultTheme } from '../theme';

export interface LinkProps {
	fontSize?: number;
}

export const Link = styled.a<LinkProps>`
	color: ${({ theme }) => theme.legacyCoreUi.colors.primary};
	font-size: ${({ fontSize }) => fontSize ?? 14}px;
	text-decoration: underline;

	&:hover {
		color: ${({ theme }) => theme.legacyCoreUi.colors.primaryHover};
	}

	&:active {
		color: ${({ theme }) => theme.legacyCoreUi.colors.primaryActive};
	}
`;
Link.defaultProps = {
	theme: defaultTheme,
};
