import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Select, IOption } from '../src';

export default {
	title: 'core-ui/Select',
	component: Select,
} as Meta;

const options: IOption[] = [
	{
		id: 'deku',
		displayValue: 'Izuku Midorya',
		kind: 'mha-hero',
	},
	{
		id: 'bakugo',
		displayValue: 'Bakugo',
		kind: 'mha-hero',
	},
	{
		id: 'shoto',
		displayValue: 'Shoto Todoroki',
		kind: 'mha-hero',
	},
	{
		id: 'shiguraki',
		displayValue: 'Tomura Shiguraki',
		kind: 'mha-villain',
	},
	{
		id: 'twice',
		displayValue: 'Jin Bubaigawara',
		kind: 'mha-villain',
	},
];

const Template: Story = () => {
	const [value, setValue] = useState(options[0]);

	return <Select label="Who is the coolest?" options={options} value={value} onChange={setValue} />;
};

export const Primary = Template.bind({});
