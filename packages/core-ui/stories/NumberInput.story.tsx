import React, { useCallback, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { NumberInput } from '../src';

export default {
	title: 'core-ui/NumberInput',
	component: NumberInput,
} as Meta;

const Template: Story = () => {
	const [state, setState] = useState(0);

	const handleSetState = useCallback((val: number) => {
		console.log(val);
		setState(val);
	}, []);

	return (
		<NumberInput
			value={state}
			onChange={handleSetState}
			label="Please fill me out"
		/>
	);
};

export const Primary = Template.bind({});
