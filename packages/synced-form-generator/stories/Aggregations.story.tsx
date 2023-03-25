import React from 'react';
import { SyncedFormGenerator } from '../src';
import { WebrtcProvider } from 'y-webrtc';
import { Y } from '@syncedstore/core';
import {
	exampleSchema,
	exampleLayout,
	exampleAggregation,
} from './examples/exampleSchema';
import { exampleWidgets } from './examples/exampleWidgets';
import { ExampleUiSection } from './examples/ExampleUiSection';

export default {
	title: 'synced-form-generator/Aggregations',
};

const doc = new Y.Doc();

new WebrtcProvider('campaign-buddy-testing-aggregations', doc, {
	password: 'password',
});

export function Primary() {
	return (
		<SyncedFormGenerator
			doc={doc}
			schema={exampleSchema}
			widgets={exampleWidgets}
			UiSection={ExampleUiSection}
			uiLayout={exampleLayout}
			aggregates={exampleAggregation}
		/>
	);
}
