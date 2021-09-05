import React, { useCallback, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { AggregatedNumberInput, Input } from '../src';

export default {
	title: 'core-ui/AggregatedNumberInput',
	component: AggregatedNumberInput,
} as Meta;

const Template: Story = () => {
	const [state, setState] = useState(0);

	const aggregatedValue = state + 10;

	const handleSetState = useCallback((val: number) => {
		console.log(val);
		setState(val);
	}, []);

	return (
		<>
		<Input value="Hi" onChange={console.log} />
		<AggregatedNumberInput
			value={state}
			label="Add ten aggregation"
			onChange={handleSetState}
			aggregatedDisplayValue={`${aggregatedValue}`}
			baseValueLabel="Base value"
			aggregationDescription="Computed value = <base> + 10"
		/>
		<Input value="Bye" onChange={console.log} />
		</>
	);
};

export const Primary = Template.bind({});
