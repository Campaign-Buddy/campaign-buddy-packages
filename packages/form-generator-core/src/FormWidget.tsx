import {
	Aggregates,
	CampaignBuddySchema,
} from '@campaign-buddy/json-schema-core';
import { EntityApi } from '@campaign-buddy/frontend-types';
import React from 'react';
import {
	FormWidgetRendererProps,
	WidgetLookup,
	WidgetProps,
} from './FormGeneratorProps';

interface FormWidgetProps {
	schema: CampaignBuddySchema;
	widgetLookup: WidgetLookup;
	path: string;
	aggregation: Aggregates | string | undefined;
	entityApi: EntityApi | undefined;
	currentUserRole: string | undefined;
	shouldShowFieldSettingControls: boolean;
	FormWidgetRenderer: React.ComponentType<FormWidgetRendererProps<any>>;
}

export const FormWidget: React.FC<React.PropsWithChildren<FormWidgetProps>> = ({
	schema,
	widgetLookup,
	path,
	aggregation,
	entityApi,
	currentUserRole,
	shouldShowFieldSettingControls,
	FormWidgetRenderer,
}) => {
	let Widget: React.FC<React.PropsWithChildren<WidgetProps<any>>> = () => null;

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
		<FormWidgetRenderer
			path={path}
			Widget={Widget}
			label={schema.title ?? ''}
			aggregation={aggregation}
			schema={schema}
			entityApi={entityApi}
			currentUserRole={currentUserRole}
			shouldShowFieldSettingControls={shouldShowFieldSettingControls}
		/>
	);
};
