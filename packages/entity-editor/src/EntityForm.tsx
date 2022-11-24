import { useEntity } from '@campaign-buddy/client-hooks';
import { Button } from '@campaign-buddy/core-ui';
import { EntityApi, MediaApi } from '@campaign-buddy/frontend-types';
import { EntityDefinition } from '@campaign-buddy/json-schema-core';
import { FormGenerator } from '@campaign-buddy/form-generator';
import {
	widgets,
	FormWidgetProvider,
} from '@campaign-buddy/form-generator-widgets';
import React from 'react';
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
	const queryClient = useQueryClient();

	if (!entity.data) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<Button
				onClick={onNavigateBack}
				icon="caret-left"
				style="minimal"
				size="small"
			>
				Back
			</Button>
			<FormWidgetProvider queryClient={queryClient} mediaApi={mediaApi}>
				<FormGenerator
					schema={entityDefinition.schema}
					data={entity.data.entityData}
					onChange={console.log}
					widgets={widgets}
				/>
			</FormWidgetProvider>
		</div>
	);
}
