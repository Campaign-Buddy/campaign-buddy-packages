import React, { useState } from 'react';
import type { IconName } from '@campaign-buddy/core-ui';
import { EntitySummary, FileSystemApi } from '@campaign-buddy/frontend-types';
import { FileExplorer } from '@campaign-buddy/file-explorer';

export interface EntityNavigatorProps {
	fileSystemApi: FileSystemApi<EntitySummary>;
	initialFolderId?: string;
}

const blankIcon = (): IconName => 'blank';

export function EntityNavigator({
	fileSystemApi,
	initialFolderId,
}: EntityNavigatorProps) {
	const [folderId, setFolderId] = useState<string | undefined>(initialFolderId);

	return (
		<FileExplorer
			folderId={folderId}
			setFolderId={setFolderId}
			api={fileSystemApi}
			getIconForItem={blankIcon}
		/>
	);
}
