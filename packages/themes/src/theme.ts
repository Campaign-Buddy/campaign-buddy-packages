import {
	IList,
	IPanelLayout,
	LegacyCoreUiTheme,
	IToolbar,
	ISizedButtons,
	IInput,
} from './components';
import { ThemeColor } from './types';

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
}
