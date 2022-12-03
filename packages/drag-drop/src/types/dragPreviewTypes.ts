import { CampaignBuddyIcon } from '@campaign-buddy/core-ui';

interface BaseDragPreview<TKind extends string> {
	kind: TKind;
}

export interface DefaultDragPreviewData extends BaseDragPreview<'default'> {
	icon?: CampaignBuddyIcon;
	title: string;
}
