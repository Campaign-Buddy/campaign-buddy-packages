import { IOption } from '@campaign-buddy/core-ui';
import { EntityApi, EntitySummary } from '@campaign-buddy/form-generator';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useEntityPickerState(
	entityApi: EntityApi,
	definitionName: string,
	selectedEntityIds: string[],
	availableEntityIds: string[] | undefined
) {
	const selectedEntitiesRef = useRef<IOption<EntitySummary>[]>();
	const [isLoadingSelectedEntities, setIsLoadingSelectedEntities] =
		useState(false);
	const [selectedEntities, setSelectedEntities] =
		useState<IOption<EntitySummary>[]>();
	const [isLoadingInitialOptions, setIsLoadingInitialOptions] = useState(true);
	const [initialOptions, setInitialOptions] = useState<
		IOption<EntitySummary>[]
	>([]);

	const { searchEntities, getEntitiesByIds, getDefaultEntities } = entityApi;

	useEffect(() => {
		if (!definitionName) {
			return;
		}

		let isCanceled = false;
		async function fetchInitialOptions() {
			if (!definitionName) {
				return;
			}

			setIsLoadingInitialOptions(true);
			const options = await getDefaultEntities(
				definitionName,
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
	}, [definitionName, getDefaultEntities, availableEntityIds]);

	useEffect(() => {
		setIsLoadingSelectedEntities(false);
		if (!definitionName || !selectedEntityIds) {
			return;
		}

		let isCanceled = false;
		async function fetchInitiallySelectedOptions() {
			const selectedIsSubsetOfLoaded = isSelectedSubsetOfLoaded(
				selectedEntityIds,
				selectedEntitiesRef.current
			);
			const selectedEqualsLoaded =
				selectedIsSubsetOfLoaded &&
				selectedEntityIds.length === (selectedEntitiesRef.current?.length ?? 0);

			if (!definitionName || selectedEqualsLoaded) {
				return;
			}

			if (selectedIsSubsetOfLoaded) {
				const selectedEntitiesById =
					selectedEntitiesRef.current?.reduce<
						Record<string, IOption<EntitySummary>>
					>((map, cur) => {
						map[cur.id] = cur;
						return map;
					}, {}) ?? {};

				setSelectedEntities(
					selectedEntityIds.map((x) => selectedEntitiesById[x])
				);
				return;
			}

			if (!selectedEntityIds) {
				selectedEntitiesRef.current = undefined;
				setSelectedEntities(undefined);
				return;
			}

			setIsLoadingSelectedEntities(true);
			const result = (
				await getEntitiesByIds(selectedEntityIds, definitionName)
			).map(entityToOption);

			if (!isCanceled) {
				selectedEntitiesRef.current = result;
				setSelectedEntities(result);
				setIsLoadingSelectedEntities(false);
			}
		}

		fetchInitiallySelectedOptions();

		return () => {
			isCanceled = true;
		};
	}, [definitionName, selectedEntityIds, getEntitiesByIds]);

	const handleFetchOptions = useCallback(
		async (query?: string) => {
			if (!definitionName) {
				return [];
			}

			if (!query) {
				return initialOptions;
			}

			const results = await searchEntities(
				query,
				definitionName,
				availableEntityIds
			);
			return results.map(entityToOption);
		},
		[searchEntities, initialOptions, definitionName, availableEntityIds]
	);

	const handleSetSelectedEntities = useCallback(
		(selectedValue: IOption<EntitySummary>[]) => {
			selectedEntitiesRef.current = selectedValue;
			setSelectedEntities(selectedValue);
		},
		[]
	);

	return {
		selectedEntities,
		setSelectedEntities: handleSetSelectedEntities,
		initialOptions,
		isLoading: isLoadingInitialOptions || isLoadingSelectedEntities,
		fetchOptions: handleFetchOptions,
	};
}

function entityToOption(entity: EntitySummary): IOption<EntitySummary> {
	return {
		id: entity.id,
		kind: entity.definitionName,
		displayValue: entity.name,
	};
}

function isSelectedSubsetOfLoaded(a: string[], b: IOption[] | undefined) {
	if (!b) {
		return a.length === 0;
	}

	const bIds = new Set(b.map((x) => x.id));
	const bHasAllOfA = a.every((x) => bIds.has(x));

	return bHasAllOfA;
}
