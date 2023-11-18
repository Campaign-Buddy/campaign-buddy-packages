import {
	barkBrown,
	maroon,
	parchment,
	makeSizedButtons,
	parchmentLight,
	maroonDark,
	maroonExtraDark,
	backgroundColor,
	gray,
	transparent,
} from '../../palette';
import {
	grayShadow,
	maroonDarkShadow,
	maroonShadow,
} from '../../palette/shadows';
import { ITheme } from '../../theme';
import { list, parchmentPanelLayout, toolbar, input } from './components';

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
		primary: makeSizedButtons(
			{
				text: parchment,
				background: maroon,
				shadow: maroonShadow,
			},
			{
				hover: {
					text: parchment,
					background: maroonDark,
					shadow: maroonShadow,
				},
				active: {
					text: parchment,
					background: maroonExtraDark,
					shadow: maroonDarkShadow,
				},
				disabled: {
					text: backgroundColor,
					background: maroon,
					shadow: grayShadow,
				},
			}
		),
		minimal: makeSizedButtons(
			{
				text: barkBrown,
				background: transparent,
			},
			{
				disabled: {
					text: gray,
					background: transparent,
				},
			}
		),
	},
	toolbar,
	list,
	input,
};
