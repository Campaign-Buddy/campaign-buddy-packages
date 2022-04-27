import styled from 'styled-components';

export const SplitContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	max-width: 100%;

	.campaign-buddy-panel-split {
		&-horizontal {
			display: flex;
			flex: 1;
			max-width: 100%;
			flex-direction: row;
		}

		&-vertical {
			height: 100%;
			width: 100%;
		}
	}

	.gutter {
		&-horizontal {
			cursor: ew-resize;
		}

		&-vertical {
			cursor: ns-resize;
		}
	}
`;
