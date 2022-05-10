export const PaneDragItemKind = 'paneDragItem';

export interface PaneDragItem {
	kind: typeof PaneDragItemKind;
	paneId: string;
	tabName: string;
}
