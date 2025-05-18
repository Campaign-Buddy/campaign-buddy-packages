import React from 'react';
import { Button, ButtonProps } from '../src/button/Button';
import { Meta } from '@storybook/react';
import { iconElementControl } from './storyUtil';

export default {
	title: 'primitive-ui/Button',
	component: Button,
	argTypes: {
		rightIcon: iconElementControl(16),
		leftIcon: iconElementControl(16),
	},
} as Meta;

export const Primary = (args: ButtonProps) => {
	return <Button {...args}>Click Me</Button>;
};
