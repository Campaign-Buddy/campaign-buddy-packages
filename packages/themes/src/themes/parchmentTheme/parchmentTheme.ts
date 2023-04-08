import { barkBrown, maroon, parchment, makeSizedButtons } from '../../palette';
import { ITheme } from '../../theme';
import { DropShadow } from '../../types';
import { list, parchmentPanelLayout, toolbar } from './components';

export const parchmentTheme: ITheme = {
	textColor: barkBrown,
	panelLayout: parchmentPanelLayout,
	legacyCoreUi: {
		colors: {
			inputBackground: '#F7EFDE',
			text: '#613819',
			textDisabled: '#c5bdb6',
			primary: '#A22815',
			primaryHover: '#902413',
			primaryActive: '#7E1F10',
			background: '#EFE1C6',
		},
	},
	buttons: {
		primary: makeSizedButtons({
			text: parchment,
			background: maroon,
			shadow: new DropShadow([
				'inset 0 0 0 1px rgba(17, 20, 24, 0.2)',
				'0 1px 2px rgba(17, 20, 24, 0.1)',
			]),
		}),
		minimal: makeSizedButtons({
			text: barkBrown,
			background: parchment,
		}),
	},
	toolbar,
	list,
};
