import type { CampaignBuddyIcon } from '@campaign-buddy/core-ui';

interface BaseDragData<TKind extends string> {
	kind: TKind;
}

export interface PaneDragData extends BaseDragData<'pane'> {
	location: string;
	tabName: string;
	paneId?: string;
	icon?: CampaignBuddyIcon;
}

export type DragData = PaneDragData;
export type DragDataKind = DragData['kind'];

export function isPaneDragData(item: any): item is PaneDragData {
	return (
		typeof item === 'object' &&
		item.kind === 'pane' &&
		typeof item.location === 'string' &&
		typeof item.tabName === 'string'
	);
}

export function isDragData(item: any): item is DragData {
	return isPaneDragData(item);
}
