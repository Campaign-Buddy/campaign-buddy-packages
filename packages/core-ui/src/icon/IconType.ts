import { IconName } from '@blueprintjs/icons';

export interface ImageIcon {
	kind: 'image';
	src: string;
}

export interface BlueprintIcon {
	kind: 'blueprint';
	icon: IconName;
}

export type CampaignBuddyIcon = ImageIcon | BlueprintIcon | IconName;
