import React from 'react';
import { UiLayout } from '@campaign-buddy/json-schema-core';
import { JSONSchema4 } from 'json-schema';
import { WidgetLookup, WidgetProps } from '.';
import { getDataForPath } from './getDataForPath';
import { getSchemaForPath } from './getSchemaForPath';
import styled from 'styled-components';
import { DebouncedWidget } from './DebouncedWidget';

interface FormUiLayoutProps {
	uiLayout: UiLayout;
	schema: JSONSchema4;
	widgetLookup: WidgetLookup;
	updateValue: (path: string, data: any) => void;
	data: any;
}

export const FormUiLayout: React.FC<FormUiLayoutProps> = ({
	uiLayout,
	schema,
	widgetLookup,
	updateValue,
	data,
}) => {
	const nodes: React.ReactElement[] = [];

	for (const element of uiLayout) {
		if (typeof element === 'string') {
			const subSchema = getSchemaForPath(element, schema);

			if (!subSchema) {
				continue;
			}

			const dataForPath = getDataForPath(element, data, subSchema);

			nodes.push(
				<FormWidget
					schema={schema}
					widgetLookup={widgetLookup}
					path={element}
					updateValue={updateValue}
					data={dataForPath}
				/>
			);
		} else if (typeof element === 'object' && !Array.isArray(element)) {
			nodes.push(
				<FormRow>
					<FormUiLayout
						uiLayout={element.uiLayout}
						schema={schema}
						widgetLookup={widgetLookup}
						updateValue={updateValue}
						data={data}
					/>
				</FormRow>
			);
		} else {
			nodes.push(
				<FormRow>
					<FormUiLayout
						uiLayout={element}
						schema={schema}
						widgetLookup={widgetLookup}
						updateValue={updateValue}
						data={data}
					/>
				</FormRow>
			);
		}
	}

	return (
		<>
			{nodes}
		</>
	);
}

interface FormWidgetProps {
	schema: JSONSchema4;
	widgetLookup: WidgetLookup;
	path: string;
	updateValue: (path: string, data: any) => void;
	data: any;
}

const FormWidget: React.FC<FormWidgetProps> = ({
	schema,
	widgetLookup,
	path,
	updateValue,
	data,
}) => {
	let Widget: React.FC<WidgetProps<any>> = () => null;

	if (schema['$uiWidget'] && widgetLookup[schema['$uiWidget']]) {
		Widget = widgetLookup[schema['$uiWidget']];
	} else if (schema.type === 'integer') {
		Widget = widgetLookup.number;
	} else if (typeof schema.type === 'string') {
		Widget = widgetLookup[schema.type];
	}

	if (!Widget) {
		console.error(`Could not find widget for schema definition at ${path}`, schema);
		return null;
	}

	if (!schema.title) {
		console.error(`Schema definition at ${path} does not have title`, schema);
		return null;
	}

	return (
		<DebouncedWidget
			path={path}
			updateValue={updateValue}
			value={data}
			Widget={Widget}
			label={schema.title ?? ''}
		/>
	)
};

const FormRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	
	& > * {
		flex-grow: 1;
	}
`;
