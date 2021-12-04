import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { ToggleButton } from '../src';

export default {
	title: 'core-ui/ToggleButton',
	component: ToggleButton,
} as Meta;

const Template: Story = () => {
	const [value, setValue] = useState(false);

	return (
		<ToggleButton value={value} onChange={setValue} icon="bold" size="small" />
	);
};

export const Primary = Template.bind({});
