import { IList, IPanelLayout, LegacyCoreUiTheme, IToolbar } from './components';
import { ThemeColor } from './types';

export interface ITheme {
	legacyCoreUi: LegacyCoreUiTheme;
	list: IList;
	panelLayout: IPanelLayout;
	toolbar: IToolbar;
	textColor: ThemeColor;
}
