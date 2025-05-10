import { barkBrown, makeSizedButtons, parchmentLight } from '../../palette';
import { ISemanticTheme, ITheme } from '../../theme';
import { BorderRadius } from '../../types';
import {
	list,
	parchmentPanelLayout,
	toolbar,
	input,
	select,
} from './components';
import { colors } from './semantic/colors';
import { shadows } from './semantic/shadows';
import { sizes } from './semantic/sizes';

export const parchmentTheme: ITheme = {
	textColor: barkBrown,
	panelLayout: parchmentPanelLayout,
	legacyCoreUi: {
		colors: {
			inputBackground: parchmentLight,
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
			background: colors.primary,
			border: shadows.raised,
			text: colors.primaryText.onPrimary,
			disabledText: colors.secondaryText.onPrimary,
		}),
		minimal: makeSizedButtons({
			background: colors.minimal,
			border: shadows.none,
			text: colors.primaryText.onBackground,
			disabledText: colors.secondaryText.onBackground,
		}),
	},
	toolbar,
	list,
	input,
	select,
};

export const semanticParchmentTheme: ISemanticTheme = {
	colors,
	shadows,
	sizes,
	borderRadii: {
		default: new BorderRadius(4),
		pill: new BorderRadius(50),
	},
};
