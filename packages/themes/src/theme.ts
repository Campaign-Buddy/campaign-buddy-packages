import {
	IList,
	LegacyCoreUiTheme,
	IToolbar,
	ISizedButtons,
	IInput,
	ISelect,
} from './components';
import { SemanticBorderRadii, SemanticColors, ThemeColor } from './types';
import { SemanticDropShadows } from './types/SemanticDropShadows';
import { SemanticSizes } from './types/SemanticSizes';

export interface ITheme {
	legacyCoreUi: LegacyCoreUiTheme;
	list: IList;
	toolbar: IToolbar;
	textColor: ThemeColor;
	buttons: {
		primary: ISizedButtons;
		minimal: ISizedButtons;
	};
	input: IInput;
	select: ISelect;
}

export interface ISemanticTheme {
	colors: SemanticColors;
	sizes: SemanticSizes;
	shadows: SemanticDropShadows;
	borderRadii: SemanticBorderRadii;
}
