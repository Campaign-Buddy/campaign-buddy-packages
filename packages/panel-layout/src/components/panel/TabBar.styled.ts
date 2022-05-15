import styled, { css } from 'styled-components';

export const TabBarContainer = styled.div`
	display: flex;
`;

export const defaultTabStyles = css`
	padding: 4px 8px;
	white-space: nowrap;
	background-color: #efe1c6;
	border-radius: 4px;
	position: relative;
	cursor: default;
	user-select: none;
`;

const hoverStyle = css<{ hoveringSide?: 'left' | 'right' }>`
	:after {
		content: '';
		position: absolute;
		${({ hoveringSide }) =>
			hoveringSide === 'left' ? 'left: 0px;' : 'right: 0px;'}
		height: 100%;
		z-index: 100;
		top: 0;
		border-left: solid 2px red;
	}
`;

export const StyledTab = styled.div<{
	isActive: boolean;
	isDragging: boolean;
	hoveringSide?: 'left' | 'right';
}>`
	${defaultTabStyles}
	${({ isDragging }) => (isDragging ? 'opacity: 50%;' : '')};
	${({ isActive }) => (!isActive ? 'background-color: transparent;' : '')};
	border-radius: 4px 4px 0 0;
	position: relative;

	:not(.campaign-buddy-active-tab):not(:hover)
		+ &:not(:first-child):not(.campaign-buddy-active-tab):not(:hover):before {
		content: '';
		position: absolute;
		width: 1px;
		left: 0px;
		height: 60%;
		top: 20%;
		border-left: solid 1px gray;
	}

	&:not(.campaign-buddy-active-tab):hover {
		background-color: rgba(239, 225, 198, 0.5);
	}

	${({ hoveringSide }) => hoveringSide && hoverStyle}
`;
