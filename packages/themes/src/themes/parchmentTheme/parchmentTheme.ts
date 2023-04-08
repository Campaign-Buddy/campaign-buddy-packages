import { barkBrown } from '../../palette/sharedColors';
import { ITheme } from '../../theme';
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
	toolbar,
	list,
};
