import { AsyncMultiSelect, IOption } from '@campaign-buddy/core-ui';
import { EntitySummary } from '@campaign-buddy/frontend-types';
import { WidgetProps } from '@campaign-buddy/form-generator';
import React, { useCallback, useMemo } from 'react';
import { useEntityPickerState } from './useEntityPickerState';

interface MultiEntityPickerData {
	availableEntityIds?: string[];
	entities?: {
		id?: string;
	}[];
}

export const MultiEntityPickerWidget: React.FC<
	WidgetProps<MultiEntityPickerData>
> = ({ value, aggregatedValue, schema, onChange, label, entityApi }) => {
	const availableEntityIds =
		aggregatedValue?.availableEntityIds ?? value?.availableEntityIds;

	const selectedEntityIds = useMemo(() => {
		return (
			(aggregatedValue?.entities ?? value?.entities)
				?.map((x) => x.id)
				.filter((x): x is string => Boolean(x)) ?? []
		);
	}, [aggregatedValue?.entities, value?.entities]);

	const entityDefinitionName = schema.$entity;

	if (!entityApi) {
		throw new Error(
			'Entity api must be supplied for EntityPickerWidget to work'
		);
	}

	if (!entityDefinitionName) {
		throw new Error(
			'Multi entity picker widget requires $entity to be an entity definition name'
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
		(selectedValues: IOption<EntitySummary>[]) => {
			setSelectedEntities(selectedValues);
			onChange({
				entities: selectedValues.map((x) => ({ id: x.id })),
				availableEntityIds: value?.availableEntityIds,
			});
		},
		[onChange, setSelectedEntities, value?.availableEntityIds]
	);

	return (
		<AsyncMultiSelect
			value={selectedEntities}
			onChange={handleOnChange}
			fetchOptions={fetchOptions}
			initialOptions={initialOptions}
			label={label}
			isLoading={isLoading}
			disabled={isLoading}
		/>
	);
};
