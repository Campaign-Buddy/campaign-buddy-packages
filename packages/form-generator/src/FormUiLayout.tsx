import React from 'react';
import {
	EntityDefinition,
	UiLayout,
	CampaignBuddySchema,
	Aggregates,
} from '@campaign-buddy/json-schema-core';
import { EntityApi } from '@campaign-buddy/frontend-types';
import {
	UiSectionProps,
	WidgetLookup,
	WidgetProps,
} from './FormGeneratorProps';
import {
	generateUiLayout,
	getDataForPath,
	getSchemaForPath,
	isUiDirective,
	getDefaultColSize,
	getDefaultColSizeForPath,
} from './utility';
import styled from 'styled-components';
import { DebouncedWidget } from './DebouncedWidget';

interface FormUiLayoutProps {
	uiLayout: UiLayout;
	schema: CampaignBuddySchema;
	widgetLookup: WidgetLookup;
	updateValue: (path: string, data: any) => void;
	data: any;
	aggregatedData: any;
	aggregates: EntityDefinition['aggregates'];
	UiSection?: React.FC<UiSectionProps>;
	entityApi: EntityApi | undefined;
}

export const FormUiLayout: React.FC<FormUiLayoutProps> = ({
	uiLayout,
	schema,
	widgetLookup,
	updateValue,
	data,
	UiSection,
	aggregatedData,
	aggregates,
	entityApi,
}) => {
	const nodes: React.ReactElement[] = [];

	function getNestedUiLayout(layout: UiLayout) {
		return (
			<FormUiLayout
				uiLayout={layout}
				schema={schema}
				widgetLookup={widgetLookup}
				updateValue={updateValue}
				data={data}
				UiSection={UiSection}
				aggregatedData={aggregatedData}
				aggregates={aggregates}
				entityApi={entityApi}
			/>
		);
	}

	for (const element of uiLayout) {
		if (typeof element === 'string') {
			const subSchema = getSchemaForPath(element, schema);

			if (
				!subSchema ||
				(subSchema.type === 'object' && !subSchema.properties)
			) {
				continue;
			}

			const dataForPath = getDataForPath(element, data, subSchema);
			const aggregatedDataForPath =
				getDataForPath(element, aggregatedData, undefined) ?? dataForPath;
			const aggregation = getDataForPath(element, aggregates ?? {}, undefined);
			const isDataEditable =
				typeof aggregation !== 'string' || /<\s*base\s*>/i.test(aggregation);

			// So that we don't have to manually type out all properties in an object
			// if the default layout is good enough
			if (subSchema.type === 'object' && !subSchema['$uiWidget']) {
				const subLayout = generateUiLayout(subSchema, element);

				nodes.push(<FormRow>{getNestedUiLayout(subLayout)}</FormRow>);
			} else {
				const cols =
					subSchema['$uiCols'] ??
					getDefaultColSizeForPath(uiLayout, schema, element);

				nodes.push(
					<FormCell cols={cols}>
						<FormWidget
							schema={subSchema}
							widgetLookup={widgetLookup}
							path={element}
							updateValue={updateValue}
							data={dataForPath}
							aggregatedData={aggregatedDataForPath}
							isEditable={isDataEditable}
							aggregation={aggregation}
							entityApi={entityApi}
						/>
					</FormCell>
				);
			}
		} else if (isUiDirective(element) && element.kind === 'section') {
			const layout = getNestedUiLayout(element.uiLayout);

			if (UiSection) {
				nodes.push(
					<FormRow>
						<UiSection title={element.title}>{layout}</UiSection>
					</FormRow>
				);
			} else {
				nodes.push(<FormRow>{layout}</FormRow>);
			}
		} else if (isUiDirective(element) && element.kind === 'columnLayout') {
			const allCols = element.columns.map((x) => x.cols || 'auto');
			nodes.push(
				<ColumnLayout>
					{element.columns.map((x, i) => (
						<FormColumn cols={x.cols || getDefaultColSize(allCols)} key={i}>
							{getNestedUiLayout(x.uiLayout)}
						</FormColumn>
					))}
				</ColumnLayout>
			);
		} else if (isUiDirective(element) && element.kind === 'whiteSpace') {
			// TODO: Handle white space
		} else {
			nodes.push(<FormRow>{getNestedUiLayout(element)}</FormRow>);
		}
	}

	return <>{nodes}</>;
};

interface FormWidgetProps {
	schema: CampaignBuddySchema;
	widgetLookup: WidgetLookup;
	path: string;
	updateValue: (path: string, data: any) => void;
	data: any;
	aggregatedData: any;
	isEditable: boolean;
	aggregation: Aggregates | string | undefined;
	entityApi: EntityApi | undefined;
}

const FormWidget: React.FC<FormWidgetProps> = ({
	schema,
	widgetLookup,
	path,
	updateValue,
	data,
	aggregatedData,
	isEditable,
	aggregation,
	entityApi,
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
		console.error(
			`Could not find widget for schema definition at ${path}`,
			schema
		);
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
			aggregatedValue={aggregatedData}
			isEditable={isEditable}
			aggregation={aggregation}
			hasAggregation={aggregation !== undefined}
			schema={schema}
			entityApi={entityApi}
		/>
	);
};

function calculateFlex(cols: number) {
	return `1 0 calc(${Math.floor((cols / 12) * 100)}% - 8px)`;
}

const FormCell = styled.div<{ cols: number }>`
	margin-bottom: 4px;
	flex: ${({ cols }) => calculateFlex(cols)};
	min-width: 100px;
`;

const FormRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	column-gap: 8px;
`;

const ColumnLayout = styled.div`
	display: flex;
	min-width: 100px;
	flex-wrap: wrap;
	flex-direction: row;
	width: 100%;
	column-gap: 8px;
`;

const FormColumn = styled.div<{ cols: number }>`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	column-gap: 8px;
	flex: ${({ cols }) => calculateFlex(cols)};
`;
