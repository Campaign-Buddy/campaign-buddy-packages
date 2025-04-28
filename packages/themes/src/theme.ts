import {
	IList,
	IPanelLayout,
	LegacyCoreUiTheme,
	IToolbar,
	ISizedButtons,
	IInput,
	ISelect,
} from './components';
import { SemanticColors, ThemeColor } from './types';
import { SemanticDropShadows } from './types/SemanticDropShadows';
import { SemanticSizes } from './types/SemanticSizes';

export interface ITheme {
	legacyCoreUi: LegacyCoreUiTheme;
	list: IList;
	panelLayout: IPanelLayout;
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
}
