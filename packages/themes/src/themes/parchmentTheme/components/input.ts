import { IInput } from '../../../components';
import {
	makeButton,
	parchmentInputBackground,
	parchmentText,
} from '../../../palette';
import { BorderRadius, Thickness } from '../../../types';
import { colors } from '../semantic/colors';
import { shadows } from '../semantic/shadows';

const defaultIncrementButtons = makeButton({
	text: colors.primaryText.onBackground,
	background: colors.minimal,
	border: shadows.none,
	disabledText: colors.secondaryText.onBackground,
	sizing: {
		minWidth: 10,
		height: 15,
		padding: new Thickness('0 8'),
		borderRadius: new BorderRadius(2),
		fontSize: 14,
		gap: 4,
	},
});

export const input: IInput = {
	numeric: {
		incrementButtons: {
			...defaultIncrementButtons,
			states: {
				...defaultIncrementButtons.states,
				default: {
					...defaultIncrementButtons.states.default,
					background: 'transparent',
				},
			},
		},
	},
	base: {
		backgroundColor: parchmentInputBackground,
		textColor: parchmentText,
	},
};
