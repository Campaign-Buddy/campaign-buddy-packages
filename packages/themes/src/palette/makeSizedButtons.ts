import { ISizedButtons } from '../components';
import { StatefulColor, StatefulDropShadow, ThemeColor } from '../types';
import { buttonSizes } from './buttonSizes';
import { makeButton } from './makeButton';

export function makeSizedButtons({
	background,
	border,
	text,
	disabledText,
}: {
	background: StatefulColor;
	border: StatefulDropShadow;
	text: ThemeColor;
	disabledText: ThemeColor;
}): ISizedButtons {
	return {
		large: makeButton({
			background,
			border,
			text,
			disabledText,
			sizing: buttonSizes.large,
		}),
		normal: makeButton({
			background,
			border,
			text,
			disabledText,
			sizing: buttonSizes.normal,
		}),
		small: makeButton({
			background,
			border,
			text,
			disabledText,
			sizing: buttonSizes.small,
		}),
	};
}
