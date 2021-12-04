import { defaultTheme } from '@campaign-buddy/core-ui';
import styled from 'styled-components';

export const ToolbarContainer = styled.div`
	padding: 4px;
	border-bottom: 1px ${({ theme }) => theme.colors.textDisabled} solid;
`;
ToolbarContainer.defaultProps = {
	theme: defaultTheme,
};
