import styled from 'styled-components';

export const PanelContentContainer = styled.div<{ isFirstTabActive: boolean }>`
	border-radius: ${({ theme }) => theme.borderRadii.default.toCss()};
	border-top-left-radius: ${({ isFirstTabActive, theme }) =>
		isFirstTabActive ? '0' : `${theme.borderRadii.default.topLeft}px`};
	background-color: ${({ theme }) => theme.colors.background.panel};
	height: 100%;
`;

export const PanelContainer = styled.div`
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	width: 100%;
	height: 100%;
`;

const topValues = {
	top: '0',
	bottom: '50%',
	right: '0',
	left: '0',
	center: '0',
};

const leftValues = {
	top: '0',
	bottom: '0',
	right: '50%',
	left: '0',
	center: '0',
};

const widthValues = {
	top: '100%',
	bottom: '100%',
	right: '50%',
	left: '50%',
	center: '100%',
};

const heightValues = {
	top: '50%',
	bottom: '50%',
	right: '100%',
	left: '100%',
	center: '100%',
};

export const DropPreview = styled.div<{
	hoveringLocation: 'top' | 'right' | 'left' | 'bottom' | 'center';
}>`
	position: absolute;
	opacity: 1;
	background-color: ${({ theme }) => theme.colors.background.dropzone};
	pointer-events: none;
	border-radius: ${({ theme }) => theme.borderRadii.default.toCss()};
	top: ${({ hoveringLocation }) => topValues[hoveringLocation]};
	left: ${({ hoveringLocation }) => leftValues[hoveringLocation]};
	width: ${({ hoveringLocation }) => widthValues[hoveringLocation]};
	height: ${({ hoveringLocation }) => heightValues[hoveringLocation]};
`;
