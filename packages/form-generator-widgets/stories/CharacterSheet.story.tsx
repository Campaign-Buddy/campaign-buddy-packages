import React, { useMemo, useState } from 'react';
import { FormGenerator } from '@campaign-buddy/form-generator';
import { Meta, Story } from '@storybook/react';
import {
	MockMediaApi,
	MockEntityApi,
	characterEntity,
} from '@campaign-buddy/mock-apis';
import { widgets, FormWidgetProvider } from '../src';
import { QueryClient } from 'react-query';

export default {
	title: 'form-generator-widgets/CharacterSheet',
} as Meta;

const mediaApi = new MockMediaApi();
const queryClient = new QueryClient();

const Template: Story = () => {
	const [data, setData] = useState({ name: 'Barry Jazz' });
	const entityApi = useMemo(
		() => new MockEntityApi(MockEntityApi.defaultOptions),
		[]
	);

	return (
		<FormWidgetProvider
			mediaApi={mediaApi}
			queryClient={queryClient}
			showAggregationIndicator
		>
			<FormGenerator
				schema={characterEntity.schema}
				data={data}
				onChange={setData}
				widgets={widgets}
				uiLayout={characterEntity.uiLayout}
				entityApi={entityApi}
			/>
		</FormWidgetProvider>
	);
};

export const Primary = Template.bind({});
