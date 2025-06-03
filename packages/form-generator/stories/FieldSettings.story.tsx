import { Meta } from '@storybook/react';
import { IOption, Select } from '@campaign-buddy/core-ui';
import { FormGenerator } from '../src';
import {
	exampleSchema,
	exampleLayout,
	exampleAggregation,
} from '../examples/exampleSchema';
import { exampleWidgets } from '../examples/exampleWidgets';
import { ExampleUiSection } from '../examples/ExampleUiSection';
import { useCallback, useState } from 'react';
import { EntityFieldSettings } from '@campaign-buddy/frontend-types';

export default {
	title: 'form-generator/FieldSettings',
} as Meta;

const roleOptions = [
	{
		displayValue: 'Game Master',
		id: 'gm',
		data: 'gm',
	},
	{
		displayValue: 'Player',
		id: 'player',
		data: 'player',
	},
];

export const Primary = () => {
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
	const [role, setRole] = useState<IOption<string>>(roleOptions[0]);
	const [fieldSettings, setFieldSettings] = useState<EntityFieldSettings>({});

	const handleUpdate = useCallback((update: any) => {
		console.log(update);
		setData(update);
	}, []);

	return (
		<div>
			<Select
				label="Your role"
				options={roleOptions}
				value={role}
				onChange={setRole}
			/>
			<FormGenerator
				schema={exampleSchema}
				data={data}
				onChange={handleUpdate}
				widgets={exampleWidgets}
				UiSection={ExampleUiSection}
				uiLayout={exampleLayout}
				aggregates={exampleAggregation}
				currentUserRole={role.data}
				fieldSettings={fieldSettings}
				updateFieldSettings={setFieldSettings}
			/>
		</div>
	);
};
