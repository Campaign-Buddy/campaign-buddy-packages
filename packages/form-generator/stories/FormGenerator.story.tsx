import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FormGenerator } from '../src';
import { exampleSchema, exampleLayout } from '../examples/exampleSchema';
import { exampleWidgets } from '../examples/exampleWidgets';
import { ExampleUiSection } from '../examples/ExampleUiSection';
import { useCallback, useState } from 'react';
import '@campaign-buddy/core-ui/src/main.css';

export default {
	title: 'form-generator/FormGenerator',
	component: FormGenerator,
} as Meta;

const Template: Story = () => {
	const [data, setData] = useState({
		name: 'Joseph Stewart',
		description: 'This is a description',
	});

	const handleUpdate = useCallback((update) => {
		console.log(update);
		setData(update);
	}, []);

	return (
		<FormGenerator
			schema={exampleSchema}
			data={data}
			onChange={handleUpdate}
			widgets={exampleWidgets}
			uiLayout={exampleLayout}
			UiSection={ExampleUiSection}
		/>
	);
};

export const Primary = Template.bind({});
