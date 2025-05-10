import {
	activeMask,
	barkBrown,
	gray,
	hoverMask,
	maroon,
	maroonDark,
	maroonExtraDark,
	maroonExtraLight,
	maroonLight,
	parchmentExtraLight,
	parchmentLight,
	transparent,
} from '../../../palette';
import { active, disable, hover, mix } from '../../../palette/colorUtility';
import { SemanticColors } from '../../../types';

export const colors: SemanticColors = {
	primary: {
		default: maroon,
		hover: maroonDark,
		active: maroonExtraDark,
		disabled: disable(maroon),
	},
	minimal: {
		default: transparent,
		hover: hoverMask,
		active: activeMask,
		disabled: transparent,
	},
	background: {
		app: parchmentExtraLight,
		panel: parchmentLight,
	},
	primaryText: {
		onBackground: barkBrown,
		onInput: {
			default: barkBrown,
			placeholder: gray,
		},
		onPrimary: parchmentLight,
		onDanger: maroonLight,
	},
	secondaryText: {
		onBackground: gray,
		onInput: {
			default: barkBrown,
			placeholder: gray,
		},
		onPrimary: parchmentLight,
		onDanger: maroonExtraLight,
	},
	input: {
		default: parchmentExtraLight,
		active: active(parchmentExtraLight),
		hover: hover(parchmentExtraLight),
		disabled: gray,
	},
	danger: {
		default: transparent,
		hover: mix('rgba(194, 80, 62, 0.10)', 'rgba(191, 184, 179, 0.20)'),
		active: mix('rgba(194, 80, 62, 0.10)', 'rgba(191, 184, 179, 0.45)'),
		disabled: transparent,
	},
	border: gray,
};
