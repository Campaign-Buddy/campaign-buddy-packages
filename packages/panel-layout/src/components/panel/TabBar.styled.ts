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

export const StyledTab = styled.div<{ isActive: boolean; isDragging: boolean }>`
	${defaultTabStyles}
	${({ isDragging }) => (isDragging ? 'opacity: 50%;' : '')};
	${({ isActive }) => (!isActive ? 'background-color: transparent;' : '')};
	border-radius: 4px 4px 0 0;

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
`;
