import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FormGenerator } from '../src';
import { exampleSchema } from '../examples/exampleSchema';
import { exampleWidgets } from '../examples/exampleWidgets';
import { useCallback, useState } from 'react';

export default {
	title: 'form-generator/FormGenerator',
	component: FormGenerator,
} as Meta;

const Template: Story = () => {
	const [data, setData] = useState({});

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
		/>
	);
};

export const Primary = Template.bind({});
