import { PaneModel } from './PanelLayoutModel';

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
		uri: string,
		location?: PaneLocation
	) => PaneModel;

	movePane: (
		paneId: string,
		location: PaneLocation
	) => PaneModel;

	removePane: (paneId: string) => PaneModel;

	navigateToLocationInPane: (
		paneId: string,
		uri: string
	) => PaneModel;

	closeAllPanesInPanel: (panelId: string) => void;

	closeAllPanesToRightOfPane: (paneId: string) => void;
}
