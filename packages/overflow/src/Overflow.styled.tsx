import styled from 'styled-components';

export const Invisible = styled.div`
	pointer-events: none;
	position: absolute;
	visibility: hidden;
`;

export const MeasuringContainer = styled.div<{ allowOverflow?: boolean }>`
	${({ allowOverflow }) => !allowOverflow && 'overflow: hidden'};
	white-space: nowrap;
	display: flex;
	flex-grow: 1;
	width: 100%;
`;

export const DefaultContainer = styled.div`
	display: flex;
`;
