import { PanelLayoutModel, PaneModel } from './PanelLayoutModel';

interface PaneLocation {
	toRightOfPanelId?: string;
	toLeftOfPanelId?: string;
	inNewRowAbovePanelId?: string;
	inNewRowBelowPanelId?: string;

	toRightOfPaneId?: string;
	toLeftOfPaneId?: string;
}

export interface IPanelApi {
	addNewPane: (
		layout: PanelLayoutModel,
		uri: string,
		location?: PaneLocation
	) => PaneModel;

	movePane: (
		layout: PanelLayoutModel,
		paneId: string,
		location: PaneLocation
	) => PaneModel;

	removePane: (layout: PanelLayoutModel, id: string) => PaneModel;

	navigateToLocationInPane: (
		layout: PanelLayoutModel,
		paneId: string,
		uri: string
	) => PaneModel;

	closeAllPanesInPanel: (layout: PanelLayoutModel, panelId: string) => void;

	closeAllPanesToRightOfPane: (layout: PanelLayoutModel, paneId: string) => void;
}
