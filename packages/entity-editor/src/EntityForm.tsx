import { useEntity, useUpdateEntity } from '@campaign-buddy/client-hooks';
import { Button, Spinner } from '@campaign-buddy/core-ui';
import { EntityApi, MediaApi } from '@campaign-buddy/frontend-types';
import { EntityDefinition } from '@campaign-buddy/json-schema-core';
import { FormGenerator } from '@campaign-buddy/form-generator';
import {
	widgets,
	FormWidgetProvider,
} from '@campaign-buddy/form-generator-widgets';
import React, { useCallback } from 'react';
import { useQueryClient } from 'react-query';

export interface EntityFormProps {
	entityApi: EntityApi;
	mediaApi: MediaApi;
	entityDefinition: EntityDefinition;
	entityId: string;
	onNavigateBack: () => void;
}

export function EntityForm({
	entityDefinition,
	onNavigateBack,
	entityApi,
	entityId,
	mediaApi,
}: EntityFormProps) {
	const entity = useEntity(entityApi, entityId, entityDefinition.name);
	const updateEntityMutation = useUpdateEntity(entityApi);
	const queryClient = useQueryClient();

	const saveEntityData = useCallback(
		(data: any) => {
			updateEntityMutation.mutate({
				id: entityId,
				entityDefinitionName: entityDefinition.name,
				entityData: data,
			});
		},
		[entityDefinition.name, entityId, updateEntityMutation]
	);

	if (!entity.data) {
		return <Spinner size="fullPage" fullHeight />;
	}

	return (
		<div>
			<Button
				onClick={onNavigateBack}
				icon="caret-left"
				variant="minimal"
				size="small"
			>
				Back
			</Button>
			<FormWidgetProvider queryClient={queryClient} mediaApi={mediaApi}>
				<FormGenerator
					schema={entityDefinition.schema}
					data={entity.data.entityData}
					onChange={saveEntityData}
					widgets={widgets}
				/>
			</FormWidgetProvider>
		</div>
	);
}
