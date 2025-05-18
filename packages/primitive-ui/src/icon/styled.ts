import styled from 'styled-components';

export const IconContainer = styled.span<{ size: number }>`
	display: inline-block;
	width: ${({ size }) => size}px;
	height: ${({ size }) => size}px;

	svg {
		fill: currentColor;
	}
`;
