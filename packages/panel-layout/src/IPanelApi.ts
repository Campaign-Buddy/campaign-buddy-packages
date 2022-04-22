export type TargetType = 'pane' | 'panel' | 'row';
export type Direction = 'before' | 'after';
export type OperationKind = 'newRow' | 'newPanel' | 'inPanel';

export interface PaneLocation {
	id: string;
	targetKind: TargetType;
	operationKind: OperationKind;
	direction?: Direction;
}

export interface IPanelApi {
	addNewPane: (uri: string, location?: PaneLocation) => string;

	movePane: (paneId: string, location: PaneLocation) => string;

	removePane: (paneId: string) => string;

	navigateToLocationInPane: (paneId: string, uri: string) => void;

	closeAllPanesInPanel: (panelId: string) => void;

	closeAllPanesToRightOfPane: (paneId: string) => void;
}
