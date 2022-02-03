import styled, { css } from 'styled-components';

export interface CommonProps {
	isSmallViewport?: boolean;
}

export const ResponsiveGrid = styled.div<CommonProps>`
	display: grid;
	grid-template-columns: ${({ isSmallViewport }) =>
		isSmallViewport ? '100%' : 'repeat(auto-fill, minmax(240px, 1fr))'};
	grid-auto-rows: 240px;
	grid-auto-flow: row dense;
	gap: 4px;
`;

const imageCommon = css`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 4px;
`;

export const TallImage = styled.img<CommonProps>`
	${imageCommon}
	grid-row: span 2 / auto;
`;

export const WideImage = styled.img<CommonProps>`
	${imageCommon}
	${({ isSmallViewport }) => !isSmallViewport && 'grid-column: span 2 / auto;'}
`;

export const BoxImage = styled.img<CommonProps>`
	${imageCommon}
`;
