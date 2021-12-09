import { defaultTheme } from '@campaign-buddy/core-ui';
import styled from 'styled-components';

export const ToolbarContainer = styled.div`
	display: flex;
	gap: 16px;
	padding: 4px;
	border-bottom: 1px ${({ theme }) => theme.colors.textDisabled} solid;
	cursor: default;
`;
ToolbarContainer.defaultProps = {
	theme: defaultTheme,
};
