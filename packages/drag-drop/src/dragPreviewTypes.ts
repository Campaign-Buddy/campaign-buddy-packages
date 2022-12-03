import { CampaignBuddyIcon } from '@campaign-buddy/core-ui';

interface BaseDragPreview<TKind extends string> {
	kind: TKind;
}

export interface DefaultDragPreview extends BaseDragPreview<'default'> {
	icon?: CampaignBuddyIcon;
	title: string;
}
