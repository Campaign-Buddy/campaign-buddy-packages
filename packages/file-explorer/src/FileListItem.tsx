import {
	ListItem,
	ListItemText,
	CampaignBuddyIcon,
	ListItemIcon,
} from '@campaign-buddy/core-ui';
import { FSItemFile } from '@campaign-buddy/frontend-types';
import React from 'react';

export interface FileListItemProps<TItemData> {
	file: FSItemFile<TItemData>;
	getIconForFile: (item: FSItemFile<TItemData>) => CampaignBuddyIcon;
}

export function FileListItem<TItemData>({
	file,
	getIconForFile,
}: FileListItemProps<TItemData>) {
	return (
		<ListItem
			onClick={() => console.log(`I will open ${file.name} eventually`)}
		>
			<ListItemIcon icon={getIconForFile(file)} />
			<ListItemText text={file.name} />
		</ListItem>
	);
}
