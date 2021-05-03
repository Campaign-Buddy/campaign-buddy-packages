import React, { useCallback, useState } from 'react';
import { UiLayout } from '@campaign-buddy/json-schema-core';
import { JSONSchema4 } from 'json-schema';
import { UiSectionProps, WidgetLookup, WidgetProps } from './FormGeneratorProps';
import { generateUiLayout, getDataForPath, getSchemaForPath } from './utility';
import styled from 'styled-components';
import { DebouncedWidget } from './DebouncedWidget';

interface FormUiLayoutProps {
	uiLayout: UiLayout;
	schema: JSONSchema4;
	widgetLookup: WidgetLookup;
	updateValue: (path: string, data: any) => void;
	data: any;
	UiSection?: React.FC<UiSectionProps>;
}

export const FormUiLayout: React.FC<FormUiLayoutProps> = ({
	uiLayout,
	schema,
	widgetLookup,
	updateValue,
	data,
	UiSection,
}) => {
	const nodes: React.ReactElement[] = [];

	for (const element of uiLayout) {
		if (typeof element === 'string') {
			const subSchema = getSchemaForPath(element, schema);

			if (!subSchema || (subSchema.type === 'object' && !subSchema.properties)) {
				continue;
			}

			const dataForPath = getDataForPath(element, data, subSchema);

			// So that we don't have to manually type out all properties in an object
			// if the default layout is good enough
			if (subSchema.type === 'object' && !subSchema['$uiWidget']) {
				const subLayout = generateUiLayout(subSchema, element);

				nodes.push(
					<FormRow>
						<FormUiLayout
							uiLayout={subLayout}
							schema={schema}
							widgetLookup={widgetLookup}
							updateValue={updateValue}
							data={data}
							UiSection={UiSection}
						/>
					</FormRow>
				)
			} else {
				nodes.push(
					<FormCell>
						<FormWidget
							schema={subSchema}
							widgetLookup={widgetLookup}
							path={element}
							updateValue={updateValue}
							data={dataForPath}
						/>
					</FormCell>
				);
			}
		} else if (typeof element === 'object' && !Array.isArray(element)) {
			const layout = (
				<FormUiLayout
					uiLayout={element.uiLayout}
					schema={schema}
					widgetLookup={widgetLookup}
					updateValue={updateValue}
					data={data}
					UiSection={UiSection}
				/>
			);
			
			if (UiSection) {
				nodes.push(
					<FormRow>
						<UiSection title={element.title}>
							{layout}
						</UiSection>
					</FormRow>
				)
			} else {
				nodes.push(
					<FormRow>
						{layout}
					</FormRow>
				);
			}
		} else {
			nodes.push(
				<FormRow>
					<FormUiLayout
						uiLayout={element}
						schema={schema}
						widgetLookup={widgetLookup}
						updateValue={updateValue}
						data={data}
						UiSection={UiSection}
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

const FormCell = styled.div`
	margin-bottom: 4px;
`;

const FormRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	column-gap: 8px;
	
	& > * {
		flex-grow: 1;
	}
`;
