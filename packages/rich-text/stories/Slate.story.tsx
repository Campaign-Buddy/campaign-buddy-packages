import React, { useState } from 'react';
import { FormGroup } from '@campaign-buddy/core-ui';
import { Meta, Story } from '@storybook/react';
import { QueryClient } from 'react-query';
import { RichTextEditor, RichTextDocument } from '../src';
import { MockMediaApi } from './mockMediaApi';

export default {
	title: 'rich-text/RichTextEditor',
	component: RichTextEditor,
} as Meta;

const mediaApi = new MockMediaApi();
const queryClient = new QueryClient();

const Template: Story = () => {
	const [value, setValue] = useState<RichTextDocument>([]);

	return (
		<FormGroup label="Edit me!" labelFor="editor">
			<RichTextEditor
				mediaApi={mediaApi}
				value={value}
				onChange={setValue}
				htmlId="editor"
				queryClient={queryClient}
			/>
		</FormGroup>
	);
};

export const Primary = Template.bind({});
