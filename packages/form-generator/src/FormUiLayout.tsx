import React from 'react';
import {
	EntityDefinition,
	UiLayout,
	CampaignBuddySchema,
} from '@campaign-buddy/json-schema-core';
import { EntityApi } from '@campaign-buddy/frontend-types';
import { UiSectionProps, WidgetLookup } from './FormGeneratorProps';
import {
	generateUiLayout,
	getDataForPath,
	getSchemaForPath,
	isUiDirective,
	getDefaultColSize,
	getDefaultColSizeForPath,
} from './utility';
import { FormWidget } from './DebouncedWidget';
import {
	FormRow,
	FormCell,
	ColumnLayout,
	FormColumn,
} from './FormUiLayout.styled';

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
