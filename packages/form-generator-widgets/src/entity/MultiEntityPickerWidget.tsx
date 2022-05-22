import {
	AggregatedDisplayText,
	AsyncMultiSelect,
	FormGroup,
	IOption,
	Spinner,
	Tag,
} from '@campaign-buddy/core-ui';
import { EntitySummary } from '@campaign-buddy/frontend-types';
import { MultiEntityAggregation } from '@campaign-buddy/json-schema-core';
import React, { useCallback, useMemo } from 'react';
import { useEntityPickerState } from './useEntityPickerState';
import { TagContainer, useAggregationContainsBase } from '../utility';
import { CBWidgetProps } from '../CBWidgetProps';

interface MultiEntityPickerData {
	availableEntityIds?: string[];
	entities?: {
		id?: string;
	}[];
}

export const MultiEntityPickerWidget: React.FC<
	React.PropsWithChildren<
		CBWidgetProps<MultiEntityPickerData, MultiEntityAggregation>
	>
> = ({
	value,
	aggregatedValue,
	schema,
	onChange,
	label,
	entityApi,
	aggregation,
}) => {
	const isEditable = useAggregationContainsBase(aggregation?.entities);

	const availableEntityIds =
		aggregatedValue?.availableEntityIds ?? value?.availableEntityIds;

	const selectedEntityIds = useMemo(() => {
		const ids = [
			...(aggregatedValue?.entities ?? []),
			...(value?.entities ?? []),
		]
			.map((x) => x.id)
			.filter((x): x is string => Boolean(x));

		return [...new Set(ids)];
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
		availableEntityIds,
		true
	);

	const handleOnChange = useCallback(
		(
			selectedValues: IOption<EntitySummary>[],
			added: IOption<EntitySummary>[],
			removed: IOption<EntitySummary>[],
			previousValue: IOption<EntitySummary>[]
		) => {
			const selectedEntitiesFromValue = previousValue.filter((x) =>
				value?.entities?.find((a) => a.id === x.id)
			);

			const selectedEntitiesFromAggregation = previousValue.filter(
				(x) =>
					aggregatedValue?.entities?.find((a) => a.id === x.id) &&
					!selectedEntitiesFromValue.find((a) => a.id === x.id)
			);

			const indexesToRemove = removed
				.map(({ id }) =>
					selectedEntitiesFromValue.findIndex((x) => x.id === id)
				)
				.filter((x) => x !== -1);

			for (const index of indexesToRemove) {
				selectedEntitiesFromValue.splice(index, 1);
			}

			selectedEntitiesFromValue.push(...added);

			setSelectedEntities([
				...selectedEntitiesFromAggregation,
				...selectedEntitiesFromValue,
			]);
			onChange({
				entities: selectedEntitiesFromValue.map(({ id }) => ({ id })),
				availableEntityIds: value?.availableEntityIds,
			});
		},
		[
			aggregatedValue?.entities,
			onChange,
			setSelectedEntities,
			value?.availableEntityIds,
			value?.entities,
		]
	);

	if (aggregation && !isEditable) {
		return (
			<FormGroup label={label}>
				<AggregatedDisplayText>
					{isLoading ? (
						<Spinner size={15} />
					) : (
						<TagContainer>
							{selectedEntities?.map((x) => (
								<Tag key={x.id}>{x.displayValue}</Tag>
							))}
						</TagContainer>
					)}
				</AggregatedDisplayText>
			</FormGroup>
		);
	}

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
