import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FormGroup } from '../src';

export default {
	title: 'core-ui/FormGroup',
	component: FormGroup,
} as Meta;

const Template: Story = () => (
	<FormGroup label="I am a form control" labelFor="someinput">
		<input id="someinput" />
	</FormGroup>
);

export const Primary = Template.bind({});

