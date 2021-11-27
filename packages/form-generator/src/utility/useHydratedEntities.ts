import { CampaignBuddySchema } from '@campaign-buddy/json-schema-core';
import { useState, useMemo, useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';
import { EntityApi, HydratedEntity } from '../FormGeneratorProps';
import {
	CancelablePromise,
	useCancelableCallback,
} from '@campaign-buddy/common-hooks';

interface UseHydratedEntitiesHook {
	hydratedData: any;
	isLoading: boolean;
}

export function useHydratedEntities(
	entityApi: EntityApi | undefined,
	data: any,
	schema: CampaignBuddySchema
): UseHydratedEntitiesHook {
	const [isLoading, setIsLoading] = useState(false);
	const [hydratedEntities, setHydratedEntities] = useState<HydratedEntity[]>(
		[]
	);

	const references = useMemo(
		() => extractEntityReferences(data, schema, '$'),
		[data, schema]
	);
	const previousReferences = useRef<EntityReference[]>([]);
	const hydrateRequests = useRef<CancelablePromise<HydratedEntity[]>[]>();

	const isMounted = useRef(true);
	useEffect(
		() => () => {
			isMounted.current = false;
		},
		[]
	);

	const hydrateEntities = useCancelableCallback(
		entityApi?.getHydratedEntities ?? (() => Promise.resolve([]))
	);

	useEffect(() => {
		if (isEqual(previousReferences.current, references) || !entityApi) {
			return;
		}

		previousReferences.current = references;
		hydrateRequests.current?.forEach((x) => x.cancel());

		const referencesByDefinitionName = references.reduce<
			Record<string, EntityReference[]>
		>((map, cur) => {
			if (!map[cur.definitionName]) {
				map[cur.definitionName] = [];
			}

			map[cur.definitionName].push(cur);
			return map;
		}, {});

		async function fetchHydratedEntities() {
			setIsLoading(true);
			hydrateRequests.current = Object.entries(referencesByDefinitionName).map(
				([definitionName, entities]) =>
					hydrateEntities(
						entities.map((x) => x.id),
						definitionName
					)
			);

			const results = await Promise.all(hydrateRequests.current);

			if (!isMounted.current) {
				return;
			}

			setIsLoading(false);
			const flatResults = results.reduce<HydratedEntity[]>(
				(all, cur) => [...all, ...cur],
				[]
			);
			setHydratedEntities(flatResults);
		}

		fetchHydratedEntities();
	}, [references, entityApi, data, hydrateEntities]);

	const hydratedData = useMemo(() => {
		if (references.length === 0) {
			return data;
		}

		return addHydratedData(data, hydratedEntities, references);
	}, [data, hydratedEntities, references]);

	return {
		hydratedData,
		isLoading,
	};
}

interface EntityReference {
	id: string;
	definitionName: string;
	path: string;
}

function addHydratedData(
	data: any,
	hydratedEntities: HydratedEntity[],
	references: EntityReference[]
): any {
	if (references.length === 0) {
		return references;
	}

	const clonedData = cloneDeep(data);

	for (const reference of references) {
		const entity = hydratedEntities.find(
			(x) =>
				x.id === reference.id && x.definitionName === reference.definitionName
		);

		if (!entity) {
			continue;
		}

		hydrateDataAtPath(clonedData, entity, reference.path);
	}

	return clonedData;
}

function hydrateDataAtPath(
	data: any,
	hydratedEntity: HydratedEntity,
	path: string
): void {
	const parts = path.split('.');

	let cur = data;
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		if (part === '$' && i === 0) {
			continue;
		}

		i++;

		if (!cur) {
			return;
		}

		cur = cur[part];
	}

	const lastPart = parts[parts.length - 1];
	if (!cur) {
		return;
	}

	cur[lastPart] = {
		id: hydratedEntity.id,
		entityData: hydratedEntity.entityData,
	};

	return;
}

function extractEntityReferences(
	data: any,
	schema: CampaignBuddySchema,
	path: string
): EntityReference[] {
	if (schema.$tags?.includes?.('dehydratedEntity') && schema.$entity) {
		if (!data || typeof data?.id !== 'string') {
			return [];
		}

		return [
			{
				id: data.id,
				definitionName: schema.$entity,
				path,
			},
		];
	}

	const results = [];

	if (
		schema.type === 'object' &&
		schema.properties &&
		typeof data === 'object'
	) {
		for (const key of Object.keys(schema.properties)) {
			const property = schema.properties[key];
			const dataAtProperty = data[key];

			if (!dataAtProperty) {
				continue;
			}

			results.push(
				...extractEntityReferences(dataAtProperty, property, `${path}.${key}`)
			);
		}
	}

	if (schema.type === 'array' && schema.items && Array.isArray(data)) {
		for (let i = 0; i < data.length; i++) {
			const dataAtIndex = data[i];

			if (!dataAtIndex) {
				continue;
			}

			results.push(
				...extractEntityReferences(dataAtIndex, schema.items, `${path}.${i}`)
			);
		}
	}

	return results;
}
