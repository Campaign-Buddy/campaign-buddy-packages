import React, { useState } from 'react';
import { types, UiLayout } from '@campaign-buddy/json-schema-core';
import { FormGenerator } from '../src';
import { exampleWidgets } from '../examples/exampleWidgets';

export default {
	title: 'form-generator/UiDirectives',
	component: FormGenerator,
};

const schema = types.object({
	name: types.string({ title: 'Name' }),
	gender: types.string({ title: 'Gender' }),
	height: types.string({ title: 'Height' }),
	weight: types.string({ title: 'Weight' }),
	bio: types.string({ title: 'Bio' }),
	notes: types.string({ title: 'Notes' }),
	someOtherText: types.string({ title: 'Some other text' }),
	spouseName: types.string({ title: 'Spouse Name' }),
	spouseGender: types.string({ title: 'Spouse Gender' }),
	spouseHeight: types.string({ title: 'Spouse Height' }),
	spouseWeight: types.string({ title: 'Spouse Weight' }),
	spouseBio: types.string({ title: 'Spouse Bio' }),
	spouseNotes: types.string({ title: 'Spouse Notes' }),
});

const uiLayout: UiLayout = [
	{
		kind: 'columnLayout',
		columns: [
			{
				uiLayout: [['name', 'gender'], ['height', 'weight'], 'notes'],
			},
			{
				uiLayout: ['bio'],
			},
		],
	},
	{
		kind: 'whiteSpace',
		marginBottom: 48,
	},
	{
		kind: 'columnLayout',
		columns: [
			{
				cols: 4,
				uiLayout: ['spouseBio'],
			},
			{
				uiLayout: [
					['spouseName', 'spouseGender'],
					['spouseHeight', 'spouseWeight'],
					'spouseNotes',
				],
			},
		],
	},
];

export const Primary = () => {
	const [data, setData] = useState({});
	return (
		<FormGenerator
			schema={schema}
			widgets={exampleWidgets}
			data={data}
			onChange={setData}
			uiLayout={uiLayout}
		/>
	);
};
