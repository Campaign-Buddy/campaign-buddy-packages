import { AsyncSelect, IOption } from '@campaign-buddy/core-ui';
import { WidgetProps, EntitySummary } from '@campaign-buddy/form-generator';
import React, { useState, useCallback, useEffect, useRef } from 'react';

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

	const selectedEntityRef = useRef<IOption<EntitySummary>>();
	const [isLoadingSelectedEntity, setIsLoadingSelectedEntity] = useState(false);
	const [selectedEntity, setSelectedEntity] =
		useState<IOption<EntitySummary>>();
	const [isLoadingInitialOptions, setIsLoadingInitialOptions] = useState(true);
	const [initialOptions, setInitialOptions] = useState<
		IOption<EntitySummary>[]
	>([]);

	const entityDefinitionName = schema.$entity;

	if (!entityApi) {
		throw new Error('Entity api must be supplied for EntityPickerWidget to work');
	}

	const { searchEntities, getEntitiesByIds, getDefaultEntities } = entityApi;

	useEffect(() => {
		if (!entityDefinitionName) {
			return;
		}

		let isCanceled = false;
		async function fetchInitialOptions() {
			if (!entityDefinitionName) {
				return;
			}

			setIsLoadingInitialOptions(true);
			const options = await getDefaultEntities(
				entityDefinitionName,
				availableEntityIds
			);

			if (!isCanceled) {
				setIsLoadingInitialOptions(false);
				setInitialOptions(options.map(entityToOption));
			}
		}

		fetchInitialOptions();

		return () => {
			isCanceled = true;
		};
	}, [entityDefinitionName, getDefaultEntities, availableEntityIds]);

	useEffect(() => {
		setIsLoadingSelectedEntity(false);
		if (!entityDefinitionName || !selectedEntityIdProp) {
			return;
		}

		let isCanceled = false;
		async function fetchInitiallySelectedOptions() {
			if (
				!entityDefinitionName ||
				(selectedEntityIdProp === selectedEntityRef.current?.id &&
					entityDefinitionName === selectedEntityRef.current?.kind)
			) {
				return;
			}

			if (!selectedEntityIdProp) {
				selectedEntityRef.current = undefined;
				setSelectedEntity(undefined);
				return;
			}

			setIsLoadingSelectedEntity(true);
			const [result] = await getEntitiesByIds(
				[selectedEntityIdProp],
				entityDefinitionName
			);

			if (!isCanceled) {
				selectedEntityRef.current = entityToOption(result);
				setSelectedEntity(entityToOption(result));
				setIsLoadingSelectedEntity(false);
			}
		}

		fetchInitiallySelectedOptions();

		return () => {
			isCanceled = true;
		};
	}, [entityDefinitionName, selectedEntityIdProp, getEntitiesByIds]);

	const handleFetchOptions = useCallback(
		async (query?: string) => {
			if (!entityDefinitionName) {
				return [];
			}

			if (!query) {
				return initialOptions;
			}

			const results = await searchEntities(
				query,
				entityDefinitionName,
				availableEntityIds
			);
			return results.map(entityToOption);
		},
		[searchEntities, initialOptions, entityDefinitionName, availableEntityIds]
	);

	const handleOnChange = useCallback(
		(selectedValue: IOption<EntitySummary>) => {
			selectedEntityRef.current = selectedValue;
			setSelectedEntity(selectedValue);
			onChange({
				entity: {
					id: selectedValue.id,
				},
				availableEntityIds: value?.availableEntityIds,
			});
		},
		[onChange, value?.availableEntityIds]
	);

	return (
		<AsyncSelect
			value={selectedEntity}
			onChange={handleOnChange}
			fetchOptions={handleFetchOptions}
			initialOptions={initialOptions}
			label={label}
			isLoading={isLoadingInitialOptions || isLoadingSelectedEntity}
			disabled={isLoadingInitialOptions || isLoadingSelectedEntity}
		/>
	);
};

function entityToOption(entity: EntitySummary): IOption<EntitySummary> {
	return {
		id: entity.id,
		kind: entity.definitionName,
		displayValue: entity.name,
	};
}
