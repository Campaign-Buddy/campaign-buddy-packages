import { IButtonState, IButtonStates, ISizedButtons } from '../components';
import { buttonSizes } from './buttonSizes';
import { makeButton } from './makeButton';

export function makeSizedButtons(
	defaultState: IButtonState,
	stateOverrides?: Partial<Omit<IButtonStates, 'default' | 'focus'>>
): ISizedButtons {
	return {
		large: makeButton(defaultState, buttonSizes.large, stateOverrides),
		normal: makeButton(defaultState, buttonSizes.normal, stateOverrides),
		small: makeButton(defaultState, buttonSizes.small, stateOverrides),
	};
}
