import { AsyncSelect, IOption } from '@campaign-buddy/core-ui';
import { EntitySummary } from '@campaign-buddy/frontend-types';
import { WidgetProps } from '@campaign-buddy/form-generator';
import React, { useCallback, useMemo } from 'react';
import { useEntityPickerState } from './useEntityPickerState';

interface EntityPickerData {
	availableEntityIds?: string[];
	entity?: {
		id?: string;
	};
}

export const EntityPickerWidget: React.FC<WidgetProps<EntityPickerData>> = ({
	value,
	aggregatedValue,
	schema,
	onChange,
	label,
	entityApi,
}) => {
	const selectedEntityIdProp = aggregatedValue?.entity?.id ?? value?.entity?.id;
	const availableEntityIds =
		aggregatedValue?.availableEntityIds ?? value?.availableEntityIds;

	const entityDefinitionName = schema.$entity;

	const selectedEntityIds = useMemo(
		() => (selectedEntityIdProp ? [selectedEntityIdProp] : []),
		[selectedEntityIdProp]
	);

	if (!entityApi) {
		throw new Error('Entity api is required for entity picker');
	}

	if (!entityDefinitionName) {
		throw new Error(
			'Entity picker widget requires $entity to be an entity definition name'
		);
	}

	const {
		selectedEntities,
		setSelectedEntities,
		initialOptions,
		isLoading,
		fetchOptions,
	} = useEntityPickerState(
		entityApi,
		entityDefinitionName,
		selectedEntityIds,
		availableEntityIds
	);

	const handleOnChange = useCallback(
		(selectedValue: IOption<EntitySummary>) => {
			setSelectedEntities([selectedValue]);
			onChange({
				entity: {
					id: selectedValue.id,
				},
				availableEntityIds: value?.availableEntityIds,
			});
		},
		[onChange, setSelectedEntities, value?.availableEntityIds]
	);

	return (
		<AsyncSelect
			value={selectedEntities?.[0]}
			onChange={handleOnChange}
			fetchOptions={fetchOptions}
			initialOptions={initialOptions}
			label={label}
			isLoading={isLoading}
			disabled={isLoading}
		/>
	);
};
