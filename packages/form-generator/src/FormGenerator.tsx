import React, { useMemo } from 'react';
import { FormGeneratorProps } from './FormGeneratorProps';
import {
	applyAggregates,
	getFullAggregates,
} from '@campaign-buddy/apply-aggregates';
import {
	generateUiLayout,
	useDataUpdater,
	hasDynamicSchemas,
	resolveDynamicSchemas,
	cleanUiLayout,
	useHydratedEntities,
} from './utility';
import { FormUiLayout } from './FormUiLayout';
import styled from 'styled-components';

export const FormGenerator: React.FC<FormGeneratorProps> = ({
	schema,
	data,
	onChange,
	widgets,
	uiLayout: providedUiLayout,
	UiSection,
	aggregates,
	entityApi,
}) => {
	const resolvedSchema = useMemo(() => {
		if (!hasDynamicSchemas(schema)) {
			return schema;
		}

		return resolveDynamicSchemas(schema, data);
	}, [schema, data]);

	const uiLayout = useMemo(() => {
		if (!providedUiLayout) {
			return generateUiLayout(resolvedSchema);
		}

		return cleanUiLayout(providedUiLayout, resolvedSchema);
	}, [providedUiLayout, resolvedSchema]);

	const updateData = useDataUpdater(schema, data, onChange);

	const fullAggregates = useMemo(
		() => getFullAggregates(aggregates, resolvedSchema),
		[aggregates, resolvedSchema]
	);

	const { hydratedData } = useHydratedEntities(entityApi, data, resolvedSchema);

	const aggregatedData = useMemo(
		() => applyAggregates(hydratedData, fullAggregates),
		[hydratedData, fullAggregates]
	);

	return (
		<FormRoot>
			<FormUiLayout
				uiLayout={uiLayout}
				schema={resolvedSchema}
				widgetLookup={widgets}
				updateValue={updateData}
				data={data}
				UiSection={UiSection}
				aggregatedData={aggregatedData}
				aggregates={fullAggregates}
				entityApi={entityApi}
			/>
		</FormRoot>
	);
};

const FormRoot = styled.div`
	display: flex;
	flex-direction: column;
`;
