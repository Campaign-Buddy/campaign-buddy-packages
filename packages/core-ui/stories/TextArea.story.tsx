import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TextArea } from '../src';

export default {
	title: 'core-ui/TextArea',
	component: TextArea,
} as Meta;

const Template: StoryFn = () => {
	const [value, setValue] = useState('');

	return (
		<TextArea value={value} onChange={setValue} label="Please fill me out" />
	);
};

export const Primary = Template.bind({});
