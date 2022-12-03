import { DragData } from './dragDataTypes';

export interface InternalDragItem {
	isInternalCampaignBuddyDragItem: true;
	item: DragData;
}

export function isInternalDragItem(item: any): item is InternalDragItem {
	return (
		typeof item === 'object' && item.isInternalCampaignBuddyDragItem === true
	);
}
