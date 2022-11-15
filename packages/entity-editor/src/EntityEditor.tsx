import React, { useCallback } from 'react';
import {
	FileSystemApi,
	EntitySummary,
	EntityApi,
	FSItemFile,
} from '@campaign-buddy/frontend-types';
import { useEntityDefinition } from '@campaign-buddy/client-hooks';
import { EntityNavigator } from './EntityNavigator';
import { EntityForm } from './EntityForm';

export interface EntityEditorProps {
	fileSystemApi: FileSystemApi<EntitySummary>;
	entityDefinitionName: string;
	entityApi: EntityApi;
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
			/>
		) : (
			<p>Loading...</p>
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
