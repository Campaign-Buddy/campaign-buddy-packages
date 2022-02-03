import styled, { css } from 'styled-components';

export const ResponsiveGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
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

export const TallImage = styled.img`
	${imageCommon}
	grid-row: span 2 / auto;
`;

export const WideImage = styled.img`
	${imageCommon}
	grid-column: span 2 / auto;
`;

export const BoxImage = styled.img`
	${imageCommon}
`;
