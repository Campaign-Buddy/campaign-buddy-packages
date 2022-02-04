import styled, { css } from 'styled-components';

export interface CommonProps {
	isSmallViewport?: boolean;
}

interface ResponsiveGridProps {
	rowHeight: number;
}

export const ResponsiveGrid = styled.div<CommonProps & ResponsiveGridProps>`
	display: grid;
	grid-template-columns: ${({ isSmallViewport, rowHeight }) =>
		isSmallViewport
			? '100%'
			: `repeat(auto-fill, minmax(${rowHeight}px, 1fr))`};
	grid-auto-rows: ${({ rowHeight }) => rowHeight}px;
	grid-auto-flow: row dense;
	gap: 4px;
`;

const cellCommon = css`
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
	border-radius: 4px;
`;

export const TallCell = styled.div<CommonProps>`
	${cellCommon}
	grid-row: span 2 / auto;
`;

export const WideCell = styled.div<CommonProps>`
	${cellCommon}
	${({ isSmallViewport }) => !isSmallViewport && 'grid-column: span 2 / auto;'}
`;

export const BoxCell = styled.div<CommonProps>`
	${cellCommon}
`;

export const CellImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const CellClickLayer = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: rgba(0, 0, 0, 0.6);
	}
`;
