import React, { useCallback } from 'react';
import {
	FileSystemApi,
	EntitySummary,
	EntityApi,
	FSItemFile,
	MediaApi,
} from '@campaign-buddy/frontend-types';
import { useEntityDefinition } from '@campaign-buddy/client-hooks';
import { EntityNavigator } from './EntityNavigator';
import { EntityForm } from './EntityForm';
import { Spinner } from '@campaign-buddy/core-ui';

export interface EntityEditorProps {
	fileSystemApi: FileSystemApi<EntitySummary>;
	entityDefinitionName: string;
	entityApi: EntityApi;
	mediaApi: MediaApi;
	entityId?: string;
	folderId?: string;
	onEntityIdChange: (entityId?: string) => void;
	onFolderIdChange: (folderId?: string) => void;
}

export function EntityEditor({
	fileSystemApi,
	folderId,
	onFolderIdChange,
	onEntityIdChange,
	entityApi,
	entityId,
	entityDefinitionName,
	mediaApi,
}: EntityEditorProps) {
	const definitionQuery = useEntityDefinition(entityApi, entityDefinitionName);

	const handleSelectEntity = useCallback(
		(item: FSItemFile<EntitySummary>) => {
			onEntityIdChange(item.data?.id);
		},
		[onEntityIdChange]
	);

	const clearEntity = useCallback(() => {
		onEntityIdChange(undefined);
	}, [onEntityIdChange]);

	if (entityId) {
		return definitionQuery.data ? (
			<EntityForm
				entityDefinition={definitionQuery.data.definition}
				entityId={entityId}
				onNavigateBack={clearEntity}
				entityApi={entityApi}
				mediaApi={mediaApi}
			/>
		) : (
			<Spinner size="fullPage" fullHeight />
		);
	}

	return (
		<EntityNavigator
			fileSystemApi={fileSystemApi}
			folderId={folderId}
			onFolderIdChange={onFolderIdChange}
			onSelectEntity={handleSelectEntity}
		/>
	);
}
