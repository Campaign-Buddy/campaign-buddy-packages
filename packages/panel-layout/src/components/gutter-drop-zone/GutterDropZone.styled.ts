import styled, { css } from 'styled-components';

const draggingOverStyle = css<{ direction: 'vertical' | 'horizontal' }>`
	&:before {
		content: '';
		position: absolute;
		height: ${({ theme, direction }) =>
			direction === 'horizontal'
				? `${theme.panelLayout.dropZones.gutterDropZoneSize}px`
				: '100%'};
		width: ${({ theme, direction }) =>
			direction === 'vertical'
				? `${theme.panelLayout.dropZones.gutterDropZoneSize}px`
				: '100%'};
		opacity: ${({ theme }) => theme.panelLayout.dropZones.opacity};
		background-color: ${({ theme }) => theme.panelLayout.dropZones.panel};
		z-index: 1000;

		top: ${({ direction, theme }) =>
			direction === 'horizontal'
				? (theme.panelLayout.dropZones.gutterDropZoneSize -
						theme.panelLayout.gap.size) /
				  -2
				: 0}px;
		left: ${({ direction, theme }) =>
			direction === 'vertical'
				? (theme.panelLayout.dropZones.gutterDropZoneSize -
						theme.panelLayout.gap.size) /
				  -2
				: 0}px;

		border-radius: ${({ theme }) =>
			theme.panelLayout.pane.borderRadius.toCss()};
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
