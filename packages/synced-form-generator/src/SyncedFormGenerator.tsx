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
import { useStableValue } from '@campaign-buddy/common-hooks';

export interface SyncedFormGeneratorProps {
	schema: CampaignBuddySchema;
	doc: Y.Doc;
	widgets: WidgetLookup;
	shouldShowFieldSettingsControls?: boolean;
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
	schema,
	widgets,
	uiLayout: providedUiLayout,
	UiSection,
	aggregates,
	entityApi,
	currentUserRole,
	shouldShowFieldSettingsControls,
}) => {
	const store = useStore(doc);

	const document = useSyncedStore(store);

	const { resolvedSchema, aggregatedData, fullAggregates, uiLayout } =
		useFormGeneratorState({
			schema,
			data: document?.data,
			currentUserRole,
			fieldSettings: document?.fieldSettings?.settings,
			providedUiLayout,
			entityApi,
			aggregates,
		});

	const stableUiLayout = useStableValue(uiLayout);

	return (
		<FormRoot>
			<SyncedStoreProvider store={store} aggregatedData={aggregatedData}>
				<FormUiLayout
					uiLayout={stableUiLayout}
					schema={resolvedSchema}
					widgetLookup={widgets}
					UiSection={UiSection}
					aggregates={fullAggregates}
					entityApi={entityApi}
					shouldShowFieldSettingControls={
						shouldShowFieldSettingsControls ?? false
					}
					currentUserRole={currentUserRole}
					FormWidgetRenderer={SyncedWidgetRenderer}
				/>
			</SyncedStoreProvider>
		</FormRoot>
	);
};
