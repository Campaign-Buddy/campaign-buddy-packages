import React, { useMemo, useState } from 'react';
import { FormGenerator } from '@campaign-buddy/form-generator';
import { Meta, Story } from '@storybook/react';
import { widgets, FormWidgetProvider } from '../src';
import { characterSchema, characterUiLayout } from './exampleSchemas';
import { MockEntityApi } from './exampleSchemas/mockEntityApi';
import { MockMediaApi } from './mockMediaApi';
import { QueryClient } from 'react-query';

export default {
	title: 'form-generator-widgets/CharacterSheet',
} as Meta;

const mediaApi = new MockMediaApi();
const queryClient = new QueryClient();

const Template: Story = () => {
	const [data, setData] = useState({ name: 'Barry Jazz' });
	const entityApi = useMemo(() => new MockEntityApi(), []);

	return (
		<FormWidgetProvider mediaApi={mediaApi} queryClient={queryClient}>
			<FormGenerator
				schema={characterSchema}
				data={data}
				onChange={setData}
				widgets={widgets}
				uiLayout={characterUiLayout}
				entityApi={entityApi}
			/>
		</FormWidgetProvider>
	);
};

export const Primary = Template.bind({});
