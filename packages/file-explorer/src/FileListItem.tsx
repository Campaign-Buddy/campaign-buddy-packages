import {
	ListItem,
	CampaignBuddyIcon,
	ListItemIcon,
} from '@campaign-buddy/core-ui';
import { FSItem, FSItemFile } from '@campaign-buddy/frontend-types';
import React, { useCallback } from 'react';
import { EditableListItemText } from './EditableListItemText';
import { useContextMenu } from './useContextMenu';

export interface FileListItemProps<TItemData> {
	file: FSItemFile<TItemData>;
	openFile: (item: FSItemFile<TItemData>) => void;
	renameItem: (item: FSItem<TItemData>, newName: string) => void;
	deleteItem: (item: FSItem<TItemData>) => void;
	getIconForFile: (item: FSItemFile<TItemData>) => CampaignBuddyIcon;
}

export function FileListItem<TItemData>({
	file,
	getIconForFile,
	openFile,
	renameItem,
	deleteItem,
}: FileListItemProps<TItemData>) {
	const handleOnClick = useCallback(() => {
		openFile(file);
	}, [file, openFile]);

	const { contextMenuItems, commitRename, cancelRename, isRenaming } =
		useContextMenu({ item: file, renameItem, deleteItem });

	return (
		<ListItem onClick={handleOnClick} contextMenuItems={contextMenuItems}>
			<ListItemIcon icon={getIconForFile(file)} />
			<EditableListItemText
				isEditing={isRenaming}
				text={file.name}
				onCommit={commitRename}
				onCancel={cancelRename}
			/>
		</ListItem>
	);
}
