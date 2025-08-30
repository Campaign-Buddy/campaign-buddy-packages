import { backgroundColor, themed } from '@campaign-buddy/theme-util';
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
		border-left: solid 2px ${({ theme }) => theme.colors.primary.default};
	}
`;

export const ButtonContainer = styled.div`
	margin-left: ${({ theme }) => theme.sizes.gaps.medium}px;
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
			${({ theme }) => theme.colors.primaryText.onBackground};
	}

	&:not(.campaign-buddy-active-tab):hover {
		${backgroundColor(themed.colors.minimal.hover)}

		&:first-child:before {
			position: absolute;
			content: '';
			bottom: ${({ theme }) => theme.borderRadii.default.topLeft * -1}px;
			left: 0;
			z-index: -10;
			width: ${({ theme }) => theme.borderRadii.default.topLeft}px;
			height: ${({ theme }) => theme.borderRadii.default.topLeft}px;
			${backgroundColor(themed.colors.minimal.hover)}
		}
	}

	border-radius: ${({ theme }) =>
		[
			theme.borderRadii.default.topRight,
			theme.borderRadii.default.topLeft,
			0,
			0,
		]
			.map((x) => `${x}px`)
			.join(' ')};

	${({ isActive, theme }) =>
		backgroundColor(
			isActive ? theme.colors.background.panel : theme.colors.minimal.default
		)};

	${({ isDragging }) => (isDragging ? 'opacity: 0.5;' : '')};
`;

export const OverflowTabContainer = styled(TabContainer)`
	width: 100px;
	max-width: 100px;
`;

export const StyledTab = styled.div<{
	hoveringSide?: 'left' | 'right';
}>`
	min-height: ${({ theme }) => theme.sizes.uiHeights.medium}px;
	max-height: ${({ theme }) => theme.sizes.uiHeights.medium}px;
	max-width: 200px;
	height: ${({ theme }) => theme.sizes.uiHeights.medium}px;
	padding: 0 ${({ theme }) => theme.sizes.gaps.medium}px;
	white-space: nowrap;
	cursor: default;
	user-select: none;
	display: flex;
	color: ${({ theme }) => theme.colors.primaryText.onBackground};
	align-items: center;

	${({ hoveringSide }) => hoveringSide && hoverStyle}
`;

export const TabTitleContainer = styled.span`
	display: inline-block;
	max-width: 100%;
	overflow: hidden;
`;
