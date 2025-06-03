import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { AggregatedTextArea } from '../src';

export default {
	title: 'core-ui/AggregatedTextArea',
	component: AggregatedTextArea,
} as Meta;

const Template: StoryFn = () => {
	const [state, setState] = useState('Base value');

	const aggregatedValue = `Wrapped: ${state}`;

	return (
		<AggregatedTextArea
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
