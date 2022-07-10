import styled from 'styled-components';

export const minSize = 50;

export type SplitDirection = 'vertical' | 'horizontal';

export interface DirectionAwareProps {
	direction: SplitDirection;
}

export const SplitChild = styled.div`
	overflow: hidden;
	position: relative;
	flex-grow: 0;
	flex-shrink: 0;
`;

export const StyledDivider = styled.div<DirectionAwareProps>`
	position: relative;
	flex-basis: ${({ theme }) => theme.panelLayout.gap.size}px;
	flex-shrink: 0;
	flex-grow: 0;
	z-index: 1000;
	cursor: ${({ direction, theme }) =>
		direction === 'horizontal'
			? theme.panelLayout.gap.horizontalCursor
			: theme.panelLayout.gap.verticalCursor};
`;

export const SplitContainer = styled.div<DirectionAwareProps>`
	display: flex;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({ direction }) =>
		direction === 'vertical' ? 'flex-direction: column;' : ''}
`;
