import {
	ListItem,
	CampaignBuddyIcon,
	ListItemIcon,
} from '@campaign-buddy/core-ui';
import {
	FileSystemApi,
	FSItem,
	FSItemFile,
} from '@campaign-buddy/frontend-types';
import React, { useCallback } from 'react';
import { QueryClient } from 'react-query';
import { EditableListItemText } from './EditableListItemText';
import { useContextMenu } from './useContextMenu';

export interface FileListItemProps<TItemData> {
	file: FSItemFile<TItemData>;
	parentFolderId?: string;
	api: FileSystemApi<TItemData>;
	invalidateDependentQueries: (
		queryClient: QueryClient,
		item?: FSItemFile<TItemData>
	) => void;
	openDeleteModal: (item?: FSItem<TItemData>) => void;
	openFile: (item: FSItemFile<TItemData>) => void;
	getIconForFile: (item: FSItemFile<TItemData>) => CampaignBuddyIcon;
}

export function FileListItem<TItemData>({
	file,
	api,
	parentFolderId,
	invalidateDependentQueries,
	getIconForFile,
	openFile,
	openDeleteModal,
}: FileListItemProps<TItemData>) {
	const handleOnClick = useCallback(() => {
		openFile(file);
	}, [file, openFile]);

	const {
		contextMenuItems,
		commitRename,
		cancelRename,
		isRenaming,
		isComittingRename,
	} = useContextMenu({
		item: file,
		api,
		invalidateDependentQueries,
		openDeleteModal,
		parentFolderId,
	});

	return (
		<ListItem
			disabled={isComittingRename}
			onClick={handleOnClick}
			contextMenuItems={contextMenuItems}
		>
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
