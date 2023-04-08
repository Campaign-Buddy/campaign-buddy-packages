import {
	IButton,
	IButtonSizing,
	IButtonState,
	ISizedButtons,
} from '../components';
import { buttonSizes } from './buttonSizes';
import { active, disable, hover } from './colorUtility';
import { focusShadow } from './shadows';

export function makeSizedButtons(defaultState: IButtonState): ISizedButtons {
	return {
		large: makeButton(defaultState, buttonSizes.large),
		normal: makeButton(defaultState, buttonSizes.normal),
		small: makeButton(defaultState, buttonSizes.small),
	};
}

export function makeButton(
	defaultState: IButtonState,
	sizing: IButtonSizing
): IButton {
	return {
		states: {
			default: defaultState,
			hover: {
				text: defaultState.text,
				shadow: defaultState.shadow?.withTransformedColor(hover),
				background: hover(defaultState.background),
			},
			active: {
				text: defaultState.text,
				shadow: defaultState.shadow?.withTransformedColor(active),
				background: active(defaultState.background),
			},
			disabled: {
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
