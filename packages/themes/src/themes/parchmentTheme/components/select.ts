import { ISelect } from '../../../components/select';
import {
	makeButton,
	parchment,
	parchmentDisabled,
	parchmentDisabledText,
	parchmentInputBackground,
	parchmentText,
} from '../../../palette';
import { buttonSizes } from '../../../palette/buttonSizes';
import { active } from '../../../palette/colorUtility';
import {
	buttonShadow,
	buttonShadowActive,
	menuShadow,
} from '../../../palette/shadows';
import { Thickness } from '../../../types';

export const select: ISelect = {
	backgroundColor: parchmentInputBackground,
	textColor: parchmentText,
	menu: {
		dropShadow: menuShadow,
		padding: new Thickness(4),
		backgroundColor: parchment,
	},
	button: makeButton(
		{
			text: parchmentText,
			background: parchmentInputBackground,
			shadow: buttonShadow,
		},
		buttonSizes.normal,
		{
			active: {
				background: active(parchmentInputBackground),
				text: parchmentText,
				shadow: buttonShadowActive,
			},
			disabled: {
				background: parchmentDisabled,
				text: parchmentDisabledText,
			},
		}
	),
};
