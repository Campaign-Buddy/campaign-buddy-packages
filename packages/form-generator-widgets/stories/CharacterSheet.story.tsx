import React, { useState } from 'react';
import { FormGenerator } from '@campaign-buddy/form-generator';
import { Meta, Story } from '@storybook/react';
import { widgets } from '../src';
import { characterSchema, characterUiLayout } from './exampleSchemas';

export default {
	title: 'form-generator-widgets/CharacterSheet',
} as Meta;

const Template: Story = () => {
	const [data, setData] = useState({ name: 'Barry Jazz' });

	return (
		<FormGenerator
			schema={characterSchema}
			data={data}
			onChange={setData}
			widgets={widgets}
			uiLayout={characterUiLayout}
		/>
	);
};

export const Primary = Template.bind({});
