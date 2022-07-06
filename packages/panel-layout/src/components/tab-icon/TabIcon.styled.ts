import styled from 'styled-components';

export const IconContainer = styled.div`
	margin: ${({ theme }) => theme.panelLayout.tab.icon.margin.toCss()};
	display: flex;
`;
