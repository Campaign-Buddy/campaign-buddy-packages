import { ListItem, ListItemIcon, ListItemText } from '@campaign-buddy/core-ui';
import { FSItemFolder } from '@campaign-buddy/frontend-types';
import React, { useCallback } from 'react';

export interface FolderListItemProps {
	folder: FSItemFolder;
	onNavigate: (folderId: string) => void;
}

export function FolderListItem({ folder, onNavigate }: FolderListItemProps) {
	const handleNavigate = useCallback(() => {
		onNavigate(folder.id);
	}, [folder.id, onNavigate]);
	return (
		<ListItem onClick={handleNavigate}>
			<ListItemIcon icon="folder-close" />
			<ListItemText text={folder.name} />
		</ListItem>
	);
}
