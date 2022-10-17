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
	initialFolderId?: string;
}

export function EntityEditor({
	fileSystemApi,
	initialFolderId,
}: EntityEditorProps) {
	return (
		<EntityNavigator
			fileSystemApi={fileSystemApi}
			initialFolderId={initialFolderId}
		/>
	);
}
