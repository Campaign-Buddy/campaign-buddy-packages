import { backgroundColor, themed } from '@campaign-buddy/theme-util';
import styled, { css } from 'styled-components';

const draggingOverStyle = css<{ direction: 'vertical' | 'horizontal' }>`
	&:before {
		content: '';
		position: absolute;
		pointer-events: none;
		height: ${({ direction }) =>
			direction === 'horizontal' ? '64px' : '100%'};
		width: ${({ direction }) => (direction === 'vertical' ? '64px' : '100%')};
		opacity: 1;
		${backgroundColor(themed.colors.background.dropzone)}
		z-index: 1000;

		top: ${({ direction, theme }) =>
			direction === 'horizontal' ? (64 - theme.sizes.gaps.medium) / -2 : 0}px;
		left: ${({ direction, theme }) =>
			direction === 'vertical' ? (64 - theme.sizes.gaps.medium) / -2 : 0}px;

		border-radius: ${themed.borderRadii.default};
	}
`;

export const StyledGutterDropZone = styled.div<{
	isDraggingOver?: boolean;
	direction: 'vertical' | 'horizontal';
}>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	${({ isDraggingOver }) => isDraggingOver && draggingOverStyle}
`;
