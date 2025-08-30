import { StatefulColor } from './StatefulColor';
import { ThemeColor } from './ThemeColor';

interface ContextualTextColors {
	onBackground: ThemeColor;
	onDropdown: ThemeColor;
	onInput: {
		default: ThemeColor;
		placeholder: ThemeColor;
	};
	onPrimary: ThemeColor;
	onDanger: ThemeColor;
}

export interface SemanticColors {
	primary: StatefulColor;
	minimal: StatefulColor;
	background: {
		dropzone: ThemeColor;
		app: ThemeColor;
		panel: ThemeColor;
		dropdown: ThemeColor;
	};
	currentBackground: ThemeColor;
	primaryText: ContextualTextColors;
	secondaryText: ContextualTextColors;
	input: StatefulColor;
	danger: StatefulColor;
	border: ThemeColor;
}
