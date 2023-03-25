import {
	applyAggregates,
	getFullAggregates,
} from '@campaign-buddy/apply-aggregates';
import { useStableValue } from '@campaign-buddy/common-hooks';
import { EntityApi, EntityFieldSettings } from '@campaign-buddy/frontend-types';
import {
	Aggregates,
	CampaignBuddySchema,
	UiLayout,
} from '@campaign-buddy/json-schema-core';
import { useMemo } from 'react';
import {
	cleanUiLayout,
	generateUiLayout,
	hasDynamicSchemas,
	resolveDynamicSchemas,
	useHydratedEntities,
} from './utility';

export interface UseFormGeneratorStateOptions {
	schema: CampaignBuddySchema;
	data: any;
	currentUserRole: string | undefined;
	aggregates: Aggregates | undefined;
	fieldSettings: EntityFieldSettings | undefined;
	providedUiLayout: UiLayout | undefined;
	entityApi: EntityApi | undefined;
}

export function useFormGeneratorState({
	schema,
	data,
	currentUserRole,
	aggregates,
	fieldSettings = {},
	providedUiLayout,
	entityApi,
}: UseFormGeneratorStateOptions) {
	const resolvedSchema = useMemo(() => {
		if (!hasDynamicSchemas(schema)) {
			return schema;
		}

		return resolveDynamicSchemas(schema, data);
	}, [schema, data]);

	const stableSchema = useStableValue(resolvedSchema);

	const { hydratedData } = useHydratedEntities(entityApi, data, stableSchema);

	const fullAggregates = useMemo(
		() => getFullAggregates(aggregates, stableSchema),
		[aggregates, stableSchema]
	);

	const aggregatedData = useMemo(
		() => applyAggregates(hydratedData, fullAggregates),
		[hydratedData, fullAggregates]
	);

	const uiLayout = useMemo(() => {
		if (!providedUiLayout) {
			return generateUiLayout(stableSchema);
		}

		return cleanUiLayout(
			providedUiLayout,
			stableSchema,
			fieldSettings,
			currentUserRole
		);
	}, [currentUserRole, fieldSettings, providedUiLayout, stableSchema]);

	return {
		aggregatedData,
		uiLayout,
		resolvedSchema: stableSchema,
		fullAggregates,
	};
}
