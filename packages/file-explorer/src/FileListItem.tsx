import {
	ListItem,
	CampaignBuddyIcon,
	ListItemIcon,
	MenuItem,
} from '@campaign-buddy/core-ui';
import { FSItemFile } from '@campaign-buddy/frontend-types';
import React, { useCallback, useMemo, useState } from 'react';
import { EditableListItemText } from './EditableListItemText';

export interface FileListItemProps<TItemData> {
	file: FSItemFile<TItemData>;
	openFile: (item: FSItemFile<TItemData>) => void;
	renameItem: (item: FSItemFile<TItemData>, newName: string) => void;
	getIconForFile: (item: FSItemFile<TItemData>) => CampaignBuddyIcon;
}

export function FileListItem<TItemData>({
	file,
	getIconForFile,
	openFile,
	renameItem,
}: FileListItemProps<TItemData>) {
	const handleOnClick = useCallback(() => {
		openFile(file);
	}, [file, openFile]);

	const [isEditing, setIsEditing] = useState(false);

	const contextMenuItems = useMemo<MenuItem[]>(
		() => [
			{
				displayText: 'Rename',
				icon: 'edit',
				onClick: () => {
					setIsEditing(true);
				},
			},
		],
		[]
	);

	const handleCommitRename = useCallback(
		(newName: string) => {
			renameItem(file, newName);
			setIsEditing(false);
		},
		[file, renameItem]
	);

	const handleCancelRename = useCallback(() => {
		setIsEditing(false);
	}, []);

	return (
		<ListItem onClick={handleOnClick} contextMenuItems={contextMenuItems}>
			<ListItemIcon icon={getIconForFile(file)} />
			<EditableListItemText
				isEditing={isEditing}
				text={file.name}
				onCommit={handleCommitRename}
				onCancel={handleCancelRename}
			/>
		</ListItem>
	);
}
