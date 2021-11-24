import { JSONSchema4 } from 'json-schema';
import {
	UiLayout,
	Aggregates,
	CampaignBuddySchema,
} from '@campaign-buddy/json-schema-core';
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

export interface WidgetProps<T> {
	onChange: (value: T) => void;
	label: string;
	hasAggregation: boolean;
	aggregation: Aggregates | string | undefined;

	/**
	 * The value from the form data (i.e.
	 * what has been passed into `updateValue`).
	 *
	 * Initially, it is set to undefined
	 */
	value: T | undefined;

	/**
	 * The value to display if not being edited,
	 * may simply be `value`, may be derived from
	 * a combination of `value` and other data,
	 * or may be completely derived from other data
	 */
	aggregatedValue: T | undefined;

	/**
	 * A property is editable if has no aggregations
	 * _or_ it's aggregations contain the <base> keyword
	 */
	isEditable: boolean;

	// The JSON scheme for this property
	schema: CampaignBuddySchema;

	/**
	 * If provided, the api to query entities
	 */
	entityApi: EntityApi | undefined;
}

export interface FormGeneratorProps {
	schema: JSONSchema4;
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

export interface EntitySummary {
	id: string;
	definitionName: string;
	name: string;
}

export interface HydratedEntity {
	id: string;
	definitionName: string;
	entityData: any;
}

export interface EntityApi {
	searchEntities: (
		query: string,
		entityDefinitionName: string,
		availableEntityIds?: string[]
	) => Promise<EntitySummary[]>;

	getEntitiesByIds: (
		ids: string[],
		entityDefinitionName: string
	) => Promise<EntitySummary[]>;

	getDefaultEntities: (
		entityDefinitionName: string,
		availableEntityIds?: string[]
	) => Promise<EntitySummary[]>;

	getHydratedEntities: (
		ids: string[],
		entityDefinitionName: string
	) => Promise<HydratedEntity[]>;
}
