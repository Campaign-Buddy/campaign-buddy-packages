import React from 'react';
import { Meta } from '@storybook/react';
import { FormGenerator } from '../src';
import {
	exampleSchema,
	exampleLayout,
	exampleAggregation,
} from '../examples/exampleSchema';
import { exampleWidgets } from '../examples/exampleSettingsWidgets';
import { ExampleUiSection } from '../examples/ExampleUiSection';
import { useCallback, useState } from 'react';

export default {
	title: 'form-generator/FieldSettings',
} as Meta;

export const AggregationSettings = () => {
	const [data, setData] = useState({
		name: 'Joseph Stewart',
		description: 'This is a description',
		additionalProperties: {
			abc: {
				type: 'string',
				title: 'ABC',
			},
			easyAs123: {
				type: 'number',
				title: 'Easy as 123',
			},
		},
	});

	const handleUpdate = useCallback((update) => {
		console.log(update);
		setData(update);
	}, []);

	return (
		<FormGenerator
			schema={exampleSchema}
			data={data}
			onChange={handleUpdate}
			widgets={exampleWidgets}
			UiSection={ExampleUiSection}
			uiLayout={exampleLayout}
			aggregates={exampleAggregation}
		/>
	);
};
