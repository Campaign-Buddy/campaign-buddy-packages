import { IPanelLayout } from '../../../components';
import { barkBrown, parchment, parchmentLight } from '../../../palette';
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

		closeButtonMargin: new Thickness('0 0 0 4'),
	},
	dropZones: {
		tabSeparator: 'red',
		tabBar: 'green',
		panel: 'blue',
		opacity: 0.5,
	},
};
