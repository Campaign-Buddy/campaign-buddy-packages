import { TabIcon } from '../../panelLayoutModel';

export const PaneDragItemKind = 'paneDragItem';

export interface PaneDragItem {
	kind: typeof PaneDragItemKind;
	location: string;
	tabName: string;
	paneId?: string;
	icon?: TabIcon;
}

export function isPaneDragItem(item: any): item is PaneDragItem {
	return (
		item.kind === PaneDragItemKind &&
		typeof item.location === 'string' &&
		typeof item.tabName === 'string'
	);
}
