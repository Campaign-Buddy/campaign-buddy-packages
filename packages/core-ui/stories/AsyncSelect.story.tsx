import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { AsyncSelect, IOption } from '../src';

export default {
	title: 'core-ui/AsyncSelect',
	component: AsyncSelect,
} as Meta;

interface Todo {
	userId: string;
	id: string;
	title: string;
	completed: boolean;
}

async function fetchOptions(
	query: string | undefined
): Promise<IOption<Todo>[]> {
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
		.filter((x) => !query || x.displayValue.includes(query))
		.slice(0, 10);
}

const Template: Story = () => {
	const [value, setValue] = useState<IOption<Todo>>();

	return (
		<AsyncSelect
			label="Select a post"
			fetchOptions={fetchOptions}
			value={value}
			onChange={setValue}
		/>
	);
};

export const Primary = Template.bind({});
