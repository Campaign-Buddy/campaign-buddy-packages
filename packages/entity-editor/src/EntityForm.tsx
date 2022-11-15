import { Button } from '@campaign-buddy/core-ui';
import { EntityDefinition } from '@campaign-buddy/json-schema-core';
import React from 'react';

export interface EntityFormProps {
	entityDefinition: EntityDefinition;
	entityId: string;
	onNavigateBack: () => void;
}

export function EntityForm({
	entityDefinition,
	onNavigateBack,
}: EntityFormProps) {
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
			<p>{entityDefinition.name}</p>
		</div>
	);
}
