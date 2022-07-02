import styled, { css } from 'styled-components';

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

export const TabContainer = styled.div<{
	isActive: boolean;
	isDragging: boolean;
}>`
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

	border-radius: ${({ theme }) => theme.panelLayout.tab.borderRadius.toCss()};

	background-color: ${({ theme, isActive, isDragging }) =>
		isDragging
			? theme.panelLayout.tab.draggingBackgroundColor
			: isActive
			? theme.panelLayout.tab.activeBackgroundColor
			: theme.panelLayout.tab.backgroundColor};

	${({ isDragging, theme }) =>
		isDragging ? `opacity: ${theme.panelLayout.tab.draggingOpacity};` : ''};
`;

export const StyledTab = styled.div<{
	hoveringSide?: 'left' | 'right';
}>`
	min-height: ${({ theme }) => theme.panelLayout.tab.height}px;
	max-height: ${({ theme }) => theme.panelLayout.tab.height}px;
	height: ${({ theme }) => theme.panelLayout.tab.height}px;
	padding: 0 ${({ theme }) => theme.panelLayout.tab.horizontalPadding}px;
	white-space: nowrap;
	cursor: default;
	user-select: none;
	display: flex;
	color: ${({ theme }) => theme.textColor};
	align-items: center;

	${({ hoveringSide }) => hoveringSide && hoverStyle}
`;
