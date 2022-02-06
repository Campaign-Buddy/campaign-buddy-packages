import React, { useState } from 'react';
import { FormGenerator } from '@campaign-buddy/form-generator';
import { widgets, FormWidgetProvider } from '../src';
import { MockMediaApi } from './mockMediaApi';
import {
	lotsOfAggregatesSchema,
	lotsOfAggregatesLayout,
} from './exampleSchemas';
import { QueryClient } from 'react-query';

export default {
	title: 'form-generator-widgets/LotsOfAggregates',
};

const mediaApi = new MockMediaApi();
const queryClient = new QueryClient();

export const Primary = () => {
	const [state, setState] = useState({});

	return (
		<FormWidgetProvider mediaApi={mediaApi} queryClient={queryClient}>
			<FormGenerator
				data={state}
				onChange={setState}
				schema={lotsOfAggregatesSchema}
				uiLayout={lotsOfAggregatesLayout}
				widgets={widgets}
			/>
		</FormWidgetProvider>
	);
};
