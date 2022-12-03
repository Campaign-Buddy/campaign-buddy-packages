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
