import React from 'react';
import { Button, ButtonProps } from '../src/button/Button';

export default {
	title: 'primitive-ui/Button',
	component: Button,
};

export const Primary = (args: ButtonProps) => {
	return <Button {...args}>Click Me</Button>;
};
