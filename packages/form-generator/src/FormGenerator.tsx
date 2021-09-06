import React, { useMemo } from 'react';
import { FormGeneratorProps } from './FormGeneratorProps';
import { applyAggregates } from '@campaign-buddy/apply-aggregates';
import {
	generateUiLayout,
	useDataUpdater,
	hasDynamicSchemas,
	resolveDynamicSchemas,
	cleanUiLayout,
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

	const aggregatedData = useMemo(
		() => applyAggregates(data, aggregates),
		[data, aggregates]
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
				aggregates={aggregates}
			/>
		</FormRoot>
	);
};

const FormRoot = styled.div`
  display: flex;
  flex-direction: column;
`;
