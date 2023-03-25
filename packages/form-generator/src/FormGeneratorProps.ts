import {
	UiLayout,
	Aggregates,
	CampaignBuddySchema,
} from '@campaign-buddy/json-schema-core';
import { EntityApi, EntityFieldSettings } from '@campaign-buddy/frontend-types';
import React from 'react';
import { Y } from '@syncedstore/core';
import {
	UiSectionProps,
	WidgetLookup,
	WidgetProps,
} from '@campaign-buddy/form-generator-core';

export interface FormGeneratorProps {
	schema: CampaignBuddySchema;
	data: any;
	onChange: (data: any) => void;
	widgets: WidgetLookup;
	uiLayout?: UiLayout;
	UiSection?: React.FC<React.PropsWithChildren<UiSectionProps>>;
	aggregates?: Aggregates;

	/**
	 * Not technically needed, but some
	 * widgets may fail if an entity
	 * api is not provided
	 */
	entityApi?: EntityApi;

	/**
	 * Field level settings for the data being
	 * operated on
	 */
	fieldSettings?: EntityFieldSettings;

	/**
	 * Allows for widget components to update field settings
	 * for individual fields
	 */
	updateFieldSettings?: (fieldSettings: EntityFieldSettings) => void;

	/**
	 * The role of the current user. The semantic
	 * values for role is left to the consumer. This
	 * property is used to match field visibility
	 * settings in fieldSettings. If left undefined,
	 * it is assumed the current user has all visibility
	 * permissions.
	 */
	currentUserRole?: string;
}

export interface SyncedFormGeneratorProps {
	schema: CampaignBuddySchema;
	doc: Y.Doc;
	fieldSettingsDoc?: Y.Doc;
	widgets: WidgetLookup;
	uiLayout?: UiLayout;
	UiSection?: React.FC<React.PropsWithChildren<UiSectionProps>>;
	aggregates?: Aggregates;

	/**
	 * Not technically needed, but some
	 * widgets may fail if an entity
	 * api is not provided
	 */
	entityApi?: EntityApi;

	/**
	 * The role of the current user. The semantic
	 * values for role is left to the consumer. This
	 * property is used to match field visibility
	 * settings in fieldSettings. If left undefined,
	 * it is assumed the current user has all visibility
	 * permissions.
	 */
	currentUserRole?: string;
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
}
