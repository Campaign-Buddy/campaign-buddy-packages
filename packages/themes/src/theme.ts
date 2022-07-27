import { IList, IPanelLayout, LegacyCoreUiTheme } from './components';
import { ThemeColor } from './types';

export interface ITheme {
	legacyCoreUi: LegacyCoreUiTheme;
	list: IList;
	panelLayout: IPanelLayout;
	textColor: ThemeColor;
}
