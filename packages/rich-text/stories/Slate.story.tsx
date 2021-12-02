import React from 'react';
import { Meta, Story } from '@storybook/react';
import { RichTextEditor } from '../src';

export default {
	title: 'rich-text/RichTextEditor',
	component: RichTextEditor,
} as Meta;

const Template: Story = () => {
	return <RichTextEditor />;
};

export const Primary = Template.bind({});
