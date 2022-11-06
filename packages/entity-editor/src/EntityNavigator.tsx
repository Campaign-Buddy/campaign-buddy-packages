import React from 'react';
import type { IconName } from '@campaign-buddy/core-ui';
import { EntitySummary, FileSystemApi } from '@campaign-buddy/frontend-types';
import { FileExplorer } from '@campaign-buddy/file-explorer';

export interface EntityNavigatorProps {
	fileSystemApi: FileSystemApi<EntitySummary>;
	folderId?: string;
	onFolderIdChange: (folderId?: string) => void;
	initialFolderId?: string;
}

const blankIcon = (): IconName => 'blank';

export function EntityNavigator({
	fileSystemApi,
	folderId,
	onFolderIdChange,
}: EntityNavigatorProps) {
	return (
		<FileExplorer
			folderId={folderId}
			setFolderId={onFolderIdChange}
			api={fileSystemApi}
			getIconForItem={blankIcon}
			openFile={(item) => console.log('opening', item)}
		/>
	);
}
