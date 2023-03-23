import React from 'react';
import * as Y from 'yjs';
import { Meta, Story } from '@storybook/react';
import { SyncedFormGenerator } from '../src';
import { exampleSchema, exampleLayout } from '../examples/exampleSchema';
import { exampleWidgets } from '../examples/exampleWidgets';
import { ExampleUiSection } from '../examples/ExampleUiSection';

export default {
	title: 'form-generator/SyncedFormGenerator',
	component: SyncedFormGenerator,
} as Meta;

const doc = new Y.Doc();

const Template: Story = () => {
	return (
		<SyncedFormGenerator
			doc={doc}
			schema={exampleSchema}
			widgets={exampleWidgets}
			UiSection={ExampleUiSection}
			uiLayout={exampleLayout}
		/>
	);
};

export const Primary = Template.bind({});
