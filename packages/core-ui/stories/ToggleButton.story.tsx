import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { ToggleButton } from '../src';

export default {
	title: 'core-ui/ToggleButton',
	component: ToggleButton,
} as Meta;

const Template: StoryFn = () => {
	const [value, setValue] = useState(false);

	return (
		<ToggleButton value={value} onChange={setValue} icon="bold" size="small" />
	);
};

export const Primary = Template.bind({});
