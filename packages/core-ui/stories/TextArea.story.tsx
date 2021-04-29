import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { TextArea } from '../src';

export default {
	title: 'core-ui/TextArea',
	component: TextArea,
} as Meta;

const Template: Story = () => {
	const [value, setValue] = useState('');

	return (
		<TextArea
			value={value}
			onChange={setValue}
		/>
	);
};

export const Primary = Template.bind({});
