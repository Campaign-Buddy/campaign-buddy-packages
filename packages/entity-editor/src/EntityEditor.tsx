import React from 'react';
import {
	FileSystemApi,
	EntitySummary,
	EntityApi,
} from '@campaign-buddy/frontend-types';
import { EntityNavigator } from './EntityNavigator';

export interface EntityEditorProps {
	fileSystemApi: FileSystemApi<EntitySummary>;
	entityApi: EntityApi;
	entityId?: string;
	folderId?: string;
	onFolderIdChange: (folderId?: string) => void;
}

export function EntityEditor({
	fileSystemApi,
	folderId,
	onFolderIdChange,
}: EntityEditorProps) {
	return (
		<EntityNavigator
			fileSystemApi={fileSystemApi}
			folderId={folderId}
			onFolderIdChange={onFolderIdChange}
		/>
	);
}
