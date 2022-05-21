import { IPanelLayout, LegacyCoreUiTheme } from './components';
import { ThemeColor } from './types';

export interface ITheme {
	legacyCoreUi: LegacyCoreUiTheme;
	panelLayout: IPanelLayout;
	textColor: ThemeColor;
}
