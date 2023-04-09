import { IInput } from '../../../components';
import { barkBrown, makeButton, parchmentLight } from '../../../palette';
import { BorderRadius, Thickness } from '../../../types';

const defaultIncrementButtons = makeButton(
	{
		text: barkBrown,
		background: parchmentLight,
	},
	{
		minWidth: 10,
		height: 15,
		padding: new Thickness('0 8'),
		borderRadius: new BorderRadius(2),
		fontSize: 14,
	}
);

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
};
