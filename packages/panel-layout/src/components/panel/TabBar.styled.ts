import styled from 'styled-components';

export const TabBarContainer = styled.div`
	display: flex;
`;

export const StyledTab = styled.div<{ isActive: boolean; isDragging: boolean }>`
	padding: 4px 8px;
	white-space: nowrap;
	background-color: ${({ isActive }) => (isActive ? '#efe1c6' : 'transparent')};
	border-radius: 4px 4px 0 0;
	position: relative;
	cursor: default;
	user-select: none;
	${({ isDragging }) => isDragging ? 'opacity: 50%;' : ''};

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
