import styled, { css } from 'styled-components';

const isOverStyle = css`
	background-color: ${({ theme }) => theme.colors.background.dropzone};

	:before {
		content: '';
		position: absolute;
		bottom: ${({ theme }) => theme.borderRadii.default.topLeft * -1}px;
		left: 0;
		width: ${({ theme }) => theme.borderRadii.default.topLeft}px;
		height: ${({ theme }) => theme.borderRadii.default.topLeft}px;
		z-index: -10;
		background-color: ${({ theme }) => theme.colors.background.dropzone};
	}

	:after {
		content: '';
		position: absolute;
		bottom: ${({ theme }) => theme.borderRadii.default.topRight * -1}px;
		right: 0;
		width: ${({ theme }) => theme.borderRadii.default.topRight}px;
		height: ${({ theme }) => theme.borderRadii.default.topRight}px;
		z-index: -10;
		background-color: ${({ theme }) => theme.colors.background.dropzone};
	}
`;

export const TabBarContainer = styled.div<{ isOver?: boolean }>`
	display: flex;
	border-radius: ${({ theme }) => theme.borderRadii.default.topLeft}px
		${({ theme }) => theme.borderRadii.default.topRight}px 0 0;
	position: relative;
	// The tabs may flicker away for a second for measuring to occur
	min-height: ${({ theme }) => theme.sizes.uiHeights.medium}px;
	${({ isOver }) => isOver && isOverStyle}
`;
