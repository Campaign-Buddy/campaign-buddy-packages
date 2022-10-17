import { ListItem, ListItemIcon } from '@campaign-buddy/core-ui';
import { FSItem, FSItemFolder } from '@campaign-buddy/frontend-types';
import React, { useCallback } from 'react';
import { EditableListItemText } from './EditableListItemText';
import { useContextMenu } from './useContextMenu';

export interface FolderListItemProps {
	folder: FSItemFolder;
	onNavigate: (folderId: string) => void;
	renameItem: (item: FSItem<any>, newName: string) => void;
}

export function FolderListItem({
	folder,
	onNavigate,
	renameItem,
}: FolderListItemProps) {
	const handleNavigate = useCallback(() => {
		onNavigate(folder.id);
	}, [folder.id, onNavigate]);

	const { contextMenuItems, isRenaming, commitRename, cancelRename } =
		useContextMenu({ item: folder, renameItem });

	return (
		<ListItem onClick={handleNavigate} contextMenuItems={contextMenuItems}>
			<ListItemIcon icon="folder-close" />
			<EditableListItemText
				text={folder.name}
				isEditing={isRenaming}
				onCommit={commitRename}
				onCancel={cancelRename}
			/>
		</ListItem>
	);
}
