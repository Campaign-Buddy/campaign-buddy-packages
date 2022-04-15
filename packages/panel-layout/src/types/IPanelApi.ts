import { PaneModel } from './PanelLayoutModel';

export type PaneLocationKind =
	| 'toRightOfPanel'
	| 'toLeftOfPanel'
	| 'inNewRowAbovePanel'
	| 'inNewRowBelowPanel'
	| 'toRightOfPane'
	| 'toLeftOfPane';

export interface PaneLocation {
	id: string;
	kind: PaneLocationKind;
}

export interface IPanelApi {
	addNewPane: (uri: string, location?: PaneLocation) => PaneModel;

	movePane: (paneId: string, location: PaneLocation) => PaneModel;

	removePane: (paneId: string) => PaneModel;

	navigateToLocationInPane: (paneId: string, uri: string) => PaneModel;

	closeAllPanesInPanel: (panelId: string) => void;

	closeAllPanesToRightOfPane: (paneId: string) => void;
}
