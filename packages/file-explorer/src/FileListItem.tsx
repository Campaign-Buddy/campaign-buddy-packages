import {
	ListItem,
	ListItemText,
	CampaignBuddyIcon,
	ListItemIcon,
} from '@campaign-buddy/core-ui';
import { FSItemFile } from '@campaign-buddy/frontend-types';
import React, { useCallback } from 'react';

export interface FileListItemProps<TItemData> {
	file: FSItemFile<TItemData>;
	openFile: (item: FSItemFile<TItemData>) => void;
	getIconForFile: (item: FSItemFile<TItemData>) => CampaignBuddyIcon;
}

export function FileListItem<TItemData>({
	file,
	getIconForFile,
	openFile,
}: FileListItemProps<TItemData>) {
	const handleOnClick = useCallback(() => {
		openFile(file);
	}, [file, openFile]);

	return (
		<ListItem onClick={handleOnClick}>
			<ListItemIcon icon={getIconForFile(file)} />
			<ListItemText text={file.name} />
		</ListItem>
	);
}
