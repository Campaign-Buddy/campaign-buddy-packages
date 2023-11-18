import {
	IButton,
	IButtonSizing,
	IButtonState,
	IButtonStates,
} from '../components';
import { active, disable, hover } from './colorUtility';
import { focusShadow } from './shadows';

export function makeButton(
	defaultState: IButtonState,
	sizing: IButtonSizing,
	stateOverrides?: Partial<Omit<IButtonStates, 'default' | 'focus'>>
): IButton {
	return {
		states: {
			default: defaultState,
			hover: stateOverrides?.hover ?? {
				text: defaultState.text,
				shadow: defaultState.shadow?.withTransformedColor(hover),
				background: hover(defaultState.background),
			},
			active: stateOverrides?.active ?? {
				text: defaultState.text,
				shadow: defaultState.shadow?.withTransformedColor(active),
				background: active(defaultState.background),
			},
			disabled: stateOverrides?.disabled ?? {
				text: disable(defaultState.text),
				shadow: defaultState.shadow?.withTransformedColor(disable),
				background: disable(defaultState.background),
			},
			focus: {
				shadow: focusShadow,
			},
		},
		sizing,
	};
}
