import {
	UiLayout,
	Aggregates,
	CampaignBuddySchema,
} from '@campaign-buddy/json-schema-core';
import { EntityApi } from '@campaign-buddy/frontend-types';
import React from 'react';

export interface UiSectionProps {
	title: string;
}

export interface WidgetLookup {
	string: React.FC<WidgetProps<string>>;
	number: React.FC<WidgetProps<number>>;
	boolean: React.FC<WidgetProps<boolean>>;
	array: React.FC<WidgetProps<any[]>>;

	[key: string]: React.FC<WidgetProps<any>>;
}

export interface WidgetProps<TValue, TAggregates = Aggregates | string> {
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
	 * A boolean describing if this field
	 * has any aggregates at all
	 */
	hasAggregation: boolean;

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
	 * A property is editable if has no aggregations
	 * _or_ it's aggregations contain the <base> keyword
	 */
	isEditable: boolean;

	/**
	 * The JSON scheme for this property
	 */
	schema: CampaignBuddySchema;

	/**
	 * If provided, the api to query entities
	 */
	entityApi: EntityApi | undefined;
}

export interface FormGeneratorProps {
	schema: CampaignBuddySchema;
	data: any;
	onChange: (data: any) => void;
	widgets: WidgetLookup;
	uiLayout?: UiLayout;
	UiSection?: React.FC<UiSectionProps>;
	aggregates?: Aggregates;

	/**
	 * Not technically needed, but some
	 * widgets may fail if an entity
	 * api is not provided
	 */
	entityApi?: EntityApi;
}
