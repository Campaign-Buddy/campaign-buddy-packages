import { ListItem, ListItemIcon } from '@campaign-buddy/core-ui';
import {
	FileSystemApi,
	FSItem,
	FSItemFile,
	FSItemFolder,
} from '@campaign-buddy/frontend-types';
import React, { useCallback } from 'react';
import { QueryClient } from 'react-query';
import { EditableListItemText } from './EditableListItemText';
import { useContextMenu } from './useContextMenu';

export interface FolderListItemProps<TItemData> {
	folder: FSItemFolder;
	parentFolderId?: string;
	api: FileSystemApi<TItemData>;
	invalidateDependentQueries: (
		queryClient: QueryClient,
		item?: FSItemFile<TItemData>
	) => void;
	openDeleteModal: (item?: FSItem<TItemData>) => void;
	onNavigate: (folderId: string) => void;
}

export function FolderListItem<TItemData>({
	folder,
	parentFolderId,
	api,
	invalidateDependentQueries,
	openDeleteModal,
	onNavigate,
}: FolderListItemProps<TItemData>) {
	const handleNavigate = useCallback(() => {
		onNavigate(folder.id);
	}, [folder.id, onNavigate]);

	const {
		contextMenuItems,
		isRenaming,
		commitRename,
		cancelRename,
		isComittingRename,
	} = useContextMenu({
		item: folder,
		parentFolderId,
		api,
		invalidateDependentQueries,
		openDeleteModal,
	});

	return (
		<ListItem
			disabled={isComittingRename}
			onClick={handleNavigate}
			contextMenuItems={contextMenuItems}
		>
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
