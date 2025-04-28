import { IButton, IButtonSizing } from '../components';
import { StatefulColor, ThemeColor } from '../types';
import { StatefulDropShadow } from '../types/StatefulDropShadow';

export function makeButton(
	background: StatefulColor,
	border: StatefulDropShadow,
	text: ThemeColor,
	disabledText: ThemeColor,
	sizing: IButtonSizing
): IButton {
	return {
		states: {
			default: {
				background: background.default,
				text,
				shadow: border.default,
			},
			active: {
				background: background.active,
				text,
				shadow: border.active,
			},
			hover: {
				background: background.hover,
				text,
				shadow: border.hover,
			},
			disabled: {
				background: background.disabled,
				text: disabledText,
				shadow: border.disabled,
			},
			focus: {
				shadow: border.focused,
			},
		},
		sizing,
	};
}
