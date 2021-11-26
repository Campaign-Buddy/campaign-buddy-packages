import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { AsyncMultiSelect, IOption } from '../src';

export default {
	title: 'core-ui/AsyncMultiSelect',
	component: AsyncMultiSelect,
} as Meta;

interface Todo {
	userId: string;
	id: string;
	title: string;
	completed: boolean;
}

async function fetchOptions(query: string): Promise<IOption<Todo>[]> {
	const response = (await fetch(
		'https://jsonplaceholder.typicode.com/todos'
	).then((r) => r.json())) as Todo[];
	return response
		.map((t) => ({
			displayValue: t.title,
			data: t,
			id: t.id,
			kind: 'todo',
		}))
		.filter((x) => x.displayValue.includes(query))
		.slice(0, 10);
}

const Template: Story = () => {
	const [value, setValue] = useState<IOption<Todo>[]>([]);

	return (
		<AsyncMultiSelect
			label="Select a post"
			fetchOptions={fetchOptions}
			value={value}
			onChange={setValue}
		/>
	);
};

export const Primary = Template.bind({});
