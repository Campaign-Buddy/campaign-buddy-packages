import styled, { css } from 'styled-components';

const isOverStyle = css`
	background-color: ${({ theme }) => theme.panelLayout.dropZones.tabBar};

	:before {
		content: '';
		position: absolute;
		bottom: ${({ theme }) =>
			theme.panelLayout.pane.borderRadius.topLeft * -1}px;
		left: 0;
		width: ${({ theme }) => theme.panelLayout.pane.borderRadius.topLeft}px;
		height: ${({ theme }) => theme.panelLayout.pane.borderRadius.topLeft}px;
		z-index: -10;
		background-color: ${({ theme }) => theme.panelLayout.dropZones.tabBar};
	}

	:after {
		content: '';
		position: absolute;
		bottom: ${({ theme }) =>
			theme.panelLayout.pane.borderRadius.topRight * -1}px;
		right: 0;
		width: ${({ theme }) => theme.panelLayout.pane.borderRadius.topRight}px;
		height: ${({ theme }) => theme.panelLayout.pane.borderRadius.topRight}px;
		z-index: -10;
		background-color: ${({ theme }) => theme.panelLayout.dropZones.tabBar};
	}
`;

export const TabBarContainer = styled.div<{ isOver?: boolean }>`
	display: flex;
	border-radius: ${({ theme }) => theme.panelLayout.tab.borderRadius.topLeft}px
		${({ theme }) => theme.panelLayout.tab.borderRadius.topRight}px 0 0;
	position: relative;
	// The tabs may flicker away for a second for measuring to occur
	min-height: ${({ theme }) => theme.panelLayout.tab.height}px;
	${({ isOver }) => isOver && isOverStyle}
`;
