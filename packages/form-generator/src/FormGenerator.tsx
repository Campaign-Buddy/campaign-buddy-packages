import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FormGeneratorProps, WidgetLookup, WidgetProps } from './FormGeneratorProps';
import { generateUiLayout } from './utility/generateUiLayout';
import { useDataUpdater } from './useDataUpdater';
import { UiLayout } from '@campaign-buddy/json-schema-core';
import { JSONSchema4 } from 'json-schema';
import { getSchemaForPath } from './getSchemaForPath';
import { DebouncedWidget } from './DebouncedWidget';
import { getDataForPath } from './getDataForPath';
import { FormUiLayout } from './uiLayoutRenderer';

export const FormGenerator: React.FC<FormGeneratorProps> = ({
	schema,
	data,
	onChange,
	widgets,
	uiLayout: providedUiLayout,
}) => {
	const uiLayout = useMemo(() => {
		if (!providedUiLayout) {
			return generateUiLayout(schema)
		}

		return providedUiLayout;
	}, [providedUiLayout]);

	const updateData = useDataUpdater(schema, data, onChange);

	return (
		<FormUiLayout
			uiLayout={uiLayout}
			schema={schema}
			widgetLookup={widgets}
			updateValue={updateData}
			data={data}
		/>
	)
};
