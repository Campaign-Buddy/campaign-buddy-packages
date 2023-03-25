import React from 'react';
import { useSyncedStore } from '@syncedstore/react';
import {
	FormRoot,
	FormUiLayout,
	UiSectionProps,
	useFormGeneratorState,
	WidgetLookup,
} from '@campaign-buddy/form-generator-core';
import { EntityApi } from '@campaign-buddy/frontend-types';
import {
	CampaignBuddySchema,
	UiLayout,
	Aggregates,
} from '@campaign-buddy/json-schema-core';
import { Y } from '@syncedstore/core';
import { SyncedStoreProvider } from './SyncedStoreProvider';
import { useStore } from './useStore';
import { SyncedWidgetRenderer } from './SyncedWidgetRenderer';

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

export const SyncedFormGenerator: React.FC<
	React.PropsWithChildren<SyncedFormGeneratorProps>
> = ({
	doc,
	fieldSettingsDoc,
	schema,
	widgets,
	uiLayout: providedUiLayout,
	UiSection,
	aggregates,
	entityApi,
	currentUserRole,
}) => {
	const dataStore = useStore(doc);
	const fieldSettingsStore = useStore(fieldSettingsDoc);

	const data = useSyncedStore(dataStore);
	const fieldSettings = useSyncedStore(fieldSettingsStore);

	const { resolvedSchema, aggregatedData, fullAggregates, uiLayout } =
		useFormGeneratorState({
			schema,
			data: data?.data,
			currentUserRole,
			fieldSettings: fieldSettings?.data,
			providedUiLayout,
			entityApi,
			aggregates,
		});

	return (
		<FormRoot>
			<SyncedStoreProvider
				dataStore={dataStore}
				fieldSettingsStore={fieldSettingsStore}
				aggregatedData={aggregatedData}
			>
				<FormUiLayout
					uiLayout={uiLayout}
					schema={resolvedSchema}
					widgetLookup={widgets}
					UiSection={UiSection}
					aggregates={fullAggregates}
					entityApi={entityApi}
					shouldShowFieldSettingControls={Boolean(fieldSettingsDoc)}
					currentUserRole={currentUserRole}
					FormWidgetRenderer={SyncedWidgetRenderer}
				/>
			</SyncedStoreProvider>
		</FormRoot>
	);
};
