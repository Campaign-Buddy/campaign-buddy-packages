import { Button, ButtonProps } from '../src/button/Button';
import { Meta } from '@storybook/react';
import { iconElementControl } from './storyUtil';

export default {
	title: 'primitive-ui/Button',
	component: Button,
	argTypes: {
		rightIcon: iconElementControl('medium'),
		leftIcon: iconElementControl('medium'),
	},
} as Meta;

export const Primary = (args: ButtonProps) => {
	return <Button {...args}>Click Me</Button>;
};
