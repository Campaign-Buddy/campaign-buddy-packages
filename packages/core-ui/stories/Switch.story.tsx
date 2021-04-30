import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '../src';

export default {
	title: 'core-ui/Switch',
	component: Switch,
} as Meta;

const Template: Story = () => {
	const [value, setValue] = useState(false);

	return (
		<Switch
			value={value}
			onChange={setValue}
			label="Please check me"
		/>
	);
};

export const Primary = Template.bind({});
