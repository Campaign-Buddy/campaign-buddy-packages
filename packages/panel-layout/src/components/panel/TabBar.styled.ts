import styled, { css } from 'styled-components';

const isOverStyle = css`
	background-color: green;

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
	${({ isOver }) => isOver && isOverStyle}
`;

const hoverStyle = css<{ hoveringSide?: 'left' | 'right' }>`
	:after {
		content: '';
		pointer-events: none;
		position: absolute;
		${({ hoveringSide }) =>
			hoveringSide === 'left' ? 'left: 0px;' : 'right: 0px;'}
		height: 100%;
		z-index: 100;
		top: 0;
		border-left: solid 2px
			${({ theme }) => theme.panelLayout.dropZones.tabSeparator};
	}
`;

export const ButtonContainer = styled.div`
	margin: ${({ theme }) => theme.panelLayout.tab.closeButtonMargin.toCss()};
`;

export const StyledTab = styled.div<{
	isActive: boolean;
	isDragging: boolean;
	hoveringSide?: 'left' | 'right';
}>`
	padding: ${({ theme }) => theme.panelLayout.tab.padding.toCss()};
	white-space: nowrap;
	background-color: ${({ theme, isActive, isDragging }) =>
		isDragging
			? theme.panelLayout.tab.draggingBackgroundColor
			: isActive
			? theme.panelLayout.tab.activeBackgroundColor
			: theme.panelLayout.tab.backgroundColor};
	position: relative;
	cursor: default;
	user-select: none;
	display: flex;
	color: ${({ theme }) => theme.textColor};
	align-items: center;

	${({ isDragging, theme }) =>
		isDragging ? `opacity: ${theme.panelLayout.tab.draggingOpacity};` : ''};
	border-radius: ${({ theme }) => theme.panelLayout.tab.borderRadius.toCss()};
	position: relative;

	:not(.campaign-buddy-active-tab):not(:hover)
		+ &:not(:first-child):not(.campaign-buddy-active-tab):not(:hover):before {
		content: '';
		position: absolute;
		width: 1px;
		left: 0px;
		height: 60%;
		top: 20%;
		border-left: solid 1px
			${({ theme }) => theme.panelLayout.tab.separatorColor};
	}

	&:not(.campaign-buddy-active-tab):hover {
		background-color: ${({ theme }) =>
			theme.panelLayout.tab.hoverBackgroundColor};

		&:first-child:before {
			position: absolute;
			content: '';
			bottom: ${({ theme }) =>
				theme.panelLayout.pane.borderRadius.topLeft * -1}px;
			left: 0;
			z-index: -10;
			width: ${({ theme }) => theme.panelLayout.pane.borderRadius.topLeft}px;
			height: ${({ theme }) => theme.panelLayout.pane.borderRadius.topLeft}px;
			background-color: ${({ theme }) =>
				theme.panelLayout.tab.hoverBackgroundColor};
		}
	}

	${({ hoveringSide }) => hoveringSide && hoverStyle}
`;
