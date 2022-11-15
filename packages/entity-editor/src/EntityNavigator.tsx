import React from 'react';
import type { IconName } from '@campaign-buddy/core-ui';
import {
	EntitySummary,
	FileSystemApi,
	FSItemFile,
} from '@campaign-buddy/frontend-types';
import { FileExplorer } from '@campaign-buddy/file-explorer';

export interface EntityNavigatorProps {
	fileSystemApi: FileSystemApi<EntitySummary>;
	folderId?: string;
	onFolderIdChange: (folderId?: string) => void;
	initialFolderId?: string;
	onSelectEntity: (item: FSItemFile<EntitySummary>) => void;
}

const blankIcon = (): IconName => 'blank';

export function EntityNavigator({
	fileSystemApi,
	folderId,
	onFolderIdChange,
	onSelectEntity,
}: EntityNavigatorProps) {
	return (
		<FileExplorer
			folderId={folderId}
			setFolderId={onFolderIdChange}
			api={fileSystemApi}
			getIconForItem={blankIcon}
			openFile={onSelectEntity}
		/>
	);
}
