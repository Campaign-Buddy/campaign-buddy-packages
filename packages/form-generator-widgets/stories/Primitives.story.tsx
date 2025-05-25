import React, { useState } from 'react';
import { FormGenerator } from '@campaign-buddy/form-generator';
import { Meta, StoryFn } from '@storybook/react';
import { widgets } from '../src';
import {
	primitiveAggregates,
	primitiveSchema,
	primitiveUiLayout,
} from './exampleSchemas';

export default {
	title: 'form-generator-widgets/Primitives',
} as Meta;

const Template: StoryFn = () => {
	const [data, setData] = useState({});

	return (
		<FormGenerator
			schema={primitiveSchema}
			data={data}
			onChange={setData}
			widgets={widgets}
			uiLayout={primitiveUiLayout}
			aggregates={primitiveAggregates}
		/>
	);
};

export const Primary = Template.bind({});
