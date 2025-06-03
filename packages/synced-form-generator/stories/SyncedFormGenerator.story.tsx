import * as Y from 'yjs';
import { Meta, StoryFn } from '@storybook/react';
import { syncedStore } from '@syncedstore/core';
import { useSyncedStore } from '@syncedstore/react';
import { WebrtcProvider } from 'y-webrtc';
import { SyncedFormGenerator } from '../src';
import { exampleSchema, exampleLayout } from './examples/exampleSchema';
import { exampleWidgets } from './examples/exampleWidgets';
import { ExampleUiSection } from './examples/ExampleUiSection';

export default {
	title: 'synced-form-generator/SyncedFormGenerator',
	component: SyncedFormGenerator,
} as Meta;

const doc = new Y.Doc();
const store = syncedStore({ data: {} }, doc);

new WebrtcProvider('campaign-buddy-testing', doc, {
	password: 'password',
});

const Template: StoryFn = () => {
	const state = useSyncedStore(store);
	return (
		<div>
			<SyncedFormGenerator
				doc={doc}
				schema={exampleSchema}
				widgets={exampleWidgets}
				UiSection={ExampleUiSection}
				uiLayout={exampleLayout}
			/>
			{JSON.stringify(state)}
		</div>
	);
};

export const Primary = Template.bind({});
