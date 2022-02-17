import React, { useCallback, useMemo } from 'react';
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

const defaultData = {};
const defaultFieldSettings = {};

export const FormGenerator: React.FC<FormGeneratorProps> = ({
	schema,
	data = defaultData,
	onChange,
	widgets,
	uiLayout: providedUiLayout,
	UiSection,
	aggregates,
	entityApi,
	updateFieldSettings: providedUpdateFieldSettings,
	fieldSettings = defaultFieldSettings,
	currentUserRole,
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

		return cleanUiLayout(
			providedUiLayout,
			resolvedSchema,
			fieldSettings,
			currentUserRole
		);
	}, [currentUserRole, fieldSettings, providedUiLayout, resolvedSchema]);

	const updateData = useDataUpdater(schema, data, onChange);

	const updateFieldSettingsOrNoop = useCallback(
		(newFieldSettings: any) => {
			providedUpdateFieldSettings?.(newFieldSettings);
		},
		[providedUpdateFieldSettings]
	);
	const updateFieldSettings = useDataUpdater(
		schema,
		fieldSettings,
		updateFieldSettingsOrNoop
	);

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
				updateFieldSettings={updateFieldSettings}
				shouldShowFieldSettingControls={Boolean(providedUpdateFieldSettings)}
				fieldSettings={fieldSettings}
				currentUserRole={currentUserRole}
			/>
		</FormRoot>
	);
};

const FormRoot = styled.div`
	display: flex;
	flex-direction: column;
`;
