import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Input } from '../src';

export default {
	title: 'core-ui/Input',
	component: Input,
} as Meta;

const Template: StoryFn = () => {
	const [value, setValue] = useState('');

	return <Input value={value} onChange={setValue} label="Please fill me out" />;
};

export const Primary = Template.bind({});
