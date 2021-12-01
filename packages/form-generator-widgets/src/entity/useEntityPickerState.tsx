import { IOption } from '@campaign-buddy/core-ui';
import { EntityApi, EntitySummary } from '@campaign-buddy/frontend-types';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useEntityPickerState(
	entityApi: EntityApi,
	definitionName: string,
	selectedEntityIds2: string[],
	availableEntityIds: string[] | undefined
) {
	const [selectedEntityIds, setSelectedEntityIds] =
		useState(selectedEntityIds2);

	useEffect(() => {
		if (!areArraysEqual(selectedEntityIds2, selectedEntityIds)) {
			setSelectedEntityIds(selectedEntityIds2);
		}
	}, [selectedEntityIds, selectedEntityIds2]);

	const selectedEntitiesRef = useRef<IOption<EntitySummary>[]>();
	const [isLoadingSelectedEntities, setIsLoadingSelectedEntities] =
		useState(false);
	const [selectedEntities, setSelectedEntities] =
		useState<IOption<EntitySummary>[]>();
	const [isLoadingInitialOptions, setIsLoadingInitialOptions] = useState(true);
	const [initialOptions, setInitialOptions] = useState<
		IOption<EntitySummary>[]
	>([]);

	const handleSetSelectedEntities = useCallback(
		(selectedValue: IOption<EntitySummary>[]) => {
			selectedEntitiesRef.current = selectedValue;
			setSelectedEntities(selectedValue);
		},
		[]
	);

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
		if (!selectedEntityIds) {
			return;
		}

		let isCanceled = false;
		async function fetchSelectedOptions() {
			if (
				isSelectedEqualToLoaded(selectedEntityIds, selectedEntitiesRef.current)
			) {
				return;
			}

			if (
				isSelectedSubsetOfLoaded(selectedEntityIds, selectedEntitiesRef.current)
			) {
				const selectedEntitiesById =
					selectedEntitiesRef.current?.reduce<
						Record<string, IOption<EntitySummary>>
					>((map, cur) => {
						map[cur.id] = cur;
						return map;
					}, {}) ?? {};

				handleSetSelectedEntities(
					selectedEntityIds.map((x) => selectedEntitiesById[x])
				);
				return;
			}

			if (!selectedEntityIds) {
				handleSetSelectedEntities([]);
				return;
			}

			setIsLoadingSelectedEntities(true);
			const result = (
				await getEntitiesByIds(selectedEntityIds, definitionName)
			).map(entityToOption);

			if (!isCanceled) {
				handleSetSelectedEntities(result);
				setIsLoadingSelectedEntities(false);
			}
		}

		fetchSelectedOptions();

		return () => {
			isCanceled = true;
		};
	}, [
		definitionName,
		selectedEntityIds,
		getEntitiesByIds,
		handleSetSelectedEntities,
	]);

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

function areArraysEqual(a: string[], b: string[]): boolean {
	return a.length === b.length && a.every((x, i) => b[i] === x);
}

function isSelectedEqualToLoaded(a: string[], b: IOption[] | undefined) {
	return a.length === b?.length && a.every((x, i) => b[i].id === x);
}

function isSelectedSubsetOfLoaded(a: string[], b: IOption[] | undefined) {
	if (!b) {
		return a.length === 0;
	}

	const bIds = new Set(b.map((x) => x.id));
	const bHasAllOfA = a.every((x) => bIds.has(x));

	return bHasAllOfA;
}
