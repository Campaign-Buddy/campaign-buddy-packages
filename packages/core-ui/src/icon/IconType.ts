import { IconName } from '@blueprintjs/icons';

const iconKinds = ['image', 'blueprint'];

export interface ImageIcon {
	kind: 'image';
	src: string;
}

export interface BlueprintIcon {
	kind: 'blueprint';
	icon: IconName;
}

export type CampaignBuddyIcon = ImageIcon | BlueprintIcon | IconName;

export function isCampaignBuddyIcon(icon: any): icon is CampaignBuddyIcon {
	return (
		typeof icon === 'string' ||
		(typeof icon === 'object' && iconKinds.includes(icon.kind))
	);
}
