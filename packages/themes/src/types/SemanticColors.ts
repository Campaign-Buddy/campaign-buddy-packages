import { StatefulColor } from './StatefulColor';
import { ThemeColor } from './ThemeColor';

interface ContextualTextColors {
	onBackground: ThemeColor;
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
		app: ThemeColor;
		panel: ThemeColor;
	};
	primaryText: ContextualTextColors;
	secondaryText: ContextualTextColors;
	input: StatefulColor;
	danger: StatefulColor;
	border: ThemeColor;
}
