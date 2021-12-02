import React from 'react';
import { FormGroup } from '@campaign-buddy/core-ui';
import { Meta, Story } from '@storybook/react';
import { RichTextEditor } from '../src';

export default {
	title: 'rich-text/RichTextEditor',
	component: RichTextEditor,
} as Meta;

const Template: Story = () => {
	return (
		<FormGroup label="Edit me!" labelFor="editor">
			<RichTextEditor htmlId="editor" />
		</FormGroup>
	);
};

export const Primary = Template.bind({});
