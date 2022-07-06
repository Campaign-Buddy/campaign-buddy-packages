import styled from 'styled-components';

export const IconContainer = styled.div`
	margin: ${({ theme }) => theme.panelLayout.tab.icon.margin.toCss()};
	display: flex;
`;

export const ImageIcon = styled.img`
	width: ${({ theme }) => theme.panelLayout.tab.icon.size}px;
	height: ${({ theme }) => theme.panelLayout.tab.icon.size}px;
	object-fit: contain;
`;
