import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { AggregatedTextInput } from '../src';

export default {
	title: 'core-ui/AggregatedTextInput',
	component: AggregatedTextInput,
} as Meta;

const Template: StoryFn = () => {
	const [state, setState] = useState('Base value');

	const aggregatedValue = `Wrapped: ${state}`;

	return (
		<AggregatedTextInput
			value={state}
			label="Aggregated text"
			onChange={setState}
			aggregatedDisplayValue={`${aggregatedValue}`}
			baseValueLabel="Base value"
			aggregationDescription="Computed value = 'Wrapped: ' + <base>"
		/>
	);
};

export const Primary = Template.bind({});
