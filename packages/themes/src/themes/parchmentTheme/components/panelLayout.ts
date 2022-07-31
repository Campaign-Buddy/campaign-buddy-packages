import { IPanelLayout } from '../../../components';
import {
	barkBrown,
	hoverMask,
	maroon,
	parchment,
	parchmentLight,
} from '../../../palette';
import { BorderRadius, Thickness } from '../../../types';

export const parchmentPanelLayout: IPanelLayout = {
	pane: {
		backgroundColor: parchment,
		borderRadius: new BorderRadius(4),
	},
	gap: {
		size: 8,
		horizontalCursor: 'ew-resize',
		verticalCursor: 'ns-resize',
	},
	tab: {
		separatorColor: barkBrown,
		backgroundColor: 'transparent',
		hoverBackgroundColor: parchmentLight,
		activeBackgroundColor: parchment,
		draggingBackgroundColor: parchmentLight,
		draggingOpacity: 0.5,

		borderRadius: new BorderRadius({ topLeft: 4, topRight: 4 }),
		height: 32,
		horizontalPadding: 8,

		preview: {
			backgroundColor: parchment,
			borderRadius: new BorderRadius(4),
			padding: new Thickness('4 8'),
			opacity: 0.75,
		},

		overflow: {
			buttonHorizontalPadding: 4,
		},

		icon: {
			size: 16,
			margin: new Thickness('0 8 0 0'),
		},

		closeButtonMargin: new Thickness('0 0 0 4'),
	},
	dropZones: {
		tabSeparator: maroon,
		tabBar: hoverMask,
		panel: hoverMask,
		opacity: 1,
		gutterDropZoneSize: 64,
	},
};
