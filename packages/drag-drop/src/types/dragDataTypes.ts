import type { CampaignBuddyIcon } from '@campaign-buddy/core-ui';
import { DiscriminatedUnionMap } from './DiscriminateUnionType';

interface BaseDragData<TKind extends string> {
	kind: TKind;
}

export interface PaneDragData extends BaseDragData<'pane'> {
	location: string;
	tabName: string;
	paneId?: string;
	icon?: CampaignBuddyIcon;
}

export interface EntityDragData extends BaseDragData<'entity'> {
	entityId: string;
	entityName: string;
	entityIcon?: CampaignBuddyIcon;
}

export type DragData = PaneDragData | EntityDragData;

export type DragDataKind = DragData['kind'];
export type DragDataMap = DiscriminatedUnionMap<DragData, 'kind'>;
export type PartialDragDataMap = Partial<DragDataMap>;
