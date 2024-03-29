import {
	Aggregates,
	CampaignBuddySchema,
} from '@campaign-buddy/json-schema-core';
import { EntityApi, FieldSettings } from '@campaign-buddy/frontend-types';
import React from 'react';
import { AggregationSupport } from './AggregationSupport';

export interface UiSectionProps {
	title: string;
}

export interface WidgetLookup {
	string: React.FC<React.PropsWithChildren<WidgetProps<string>>>;
	number: React.FC<React.PropsWithChildren<WidgetProps<number>>>;
	boolean: React.FC<React.PropsWithChildren<WidgetProps<boolean>>>;
	array: React.FC<React.PropsWithChildren<WidgetProps<any[]>>>;

	[key: string]: React.FC<React.PropsWithChildren<WidgetProps<any>>>;
}

export interface WidgetProps<TValue, TAggregates = any> {
	/**
	 * The change handler for the field. It's
	 * first parameter should include the full
	 * updated value.
	 */
	onChange: (value: TValue) => void;

	/**
	 * The title of the field
	 */
	label: string;

	/**
	 * If the field has aggregates, this prop
	 * will contain the raw aggregate expressions
	 * specified in either the schema or the
	 * aggregates object
	 */
	aggregation: TAggregates | undefined;

	/**
	 * The value from the form data (i.e.
	 * what has been passed into `updateValue`).
	 *
	 * Initially, it is set to undefined
	 */
	value: TValue | undefined;

	/**
	 * The value to display if not being edited,
	 * may simply be `value`, may be derived from
	 * a combination of `value` and other data,
	 * or may be completely derived from other data
	 */
	aggregatedValue: TValue | undefined;

	/**
	 * The JSON scheme for this property
	 */
	schema: CampaignBuddySchema;

	/**
	 * Whether or not this field supports aggregation (regardless
	 * of current field settings). This will be an object for
	 * complex aggregations.
	 */
	aggregationSupport: AggregationSupport<TAggregates>;

	/**
	 * If provided, the api to query entities
	 */
	entityApi: EntityApi | undefined;

	/**
	 * The field settings for the rendered field
	 */
	fieldSettings: FieldSettings<TAggregates> | undefined;

	/**
	 * An optional callback to update field settings
	 */
	updateFieldSettings:
		| ((fieldSettings: FieldSettings<TAggregates>) => void)
		| undefined;

	/**
	 * If provided to the FormGenerator component, the
	 * role of the current user. This property is useful
	 * for determining what field settings a user may change.
	 */
	currentUserRole: string | undefined;
}

/**
 * Renders and controls state for an individual widgets
 */
export interface FormWidgetRendererProps<T>
	extends Omit<
		WidgetProps<T>,
		| 'onChange'
		| 'updateFieldSettings'
		| 'aggregationSupport'
		| 'aggregatedValue'
		| 'value'
		| 'fieldSettings'
	> {
	path: string;
	aggregation: Aggregates | string | undefined;
	Widget: React.FC<React.PropsWithChildren<WidgetProps<T>>>;
	schema: CampaignBuddySchema;
	entityApi: EntityApi | undefined;
	shouldShowFieldSettingControls: boolean;
	aggregationSupport: AggregationSupport<string | Aggregates>;
}
