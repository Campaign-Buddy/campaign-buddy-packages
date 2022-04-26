import styled from 'styled-components';

// TODO: Replace with theme values
export const PanelContentContainer = styled.div<{ isFirstTabActive: boolean }>`
	border-radius: ${({ isFirstTabActive }) => (isFirstTabActive ? '0' : '4px')}
		4px 4px;
	background-color: #efe1c6;
	height: 100%;
`;

export const PanelContainer = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	width: 100%;
	height: 100%;
`;

export const TabBarContainer = styled.div``;
