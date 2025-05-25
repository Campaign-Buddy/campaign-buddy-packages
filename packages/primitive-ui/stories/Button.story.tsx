import { Button, ButtonProps } from '../src/button/Button';
import { Meta } from '@storybook/react';

export default {
	title: 'primitive-ui/Button',
	component: Button,
} as Meta;

export const Primary = (args: ButtonProps) => {
	return <Button {...args}>Click Me</Button>;
};
