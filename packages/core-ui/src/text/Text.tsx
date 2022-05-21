import styled from 'styled-components';
import { defaultTheme } from '../theme';

interface TextProps {
	fontSize?: number;
}

export const Text = styled.p<TextProps>`
	margin: 0;
	color: ${({ theme }) => theme.legacyCoreUi.colors.text};
	font-size: ${({ fontSize }) => fontSize ?? 14}px;
`;
Text.defaultProps = {
	theme: defaultTheme,
};
