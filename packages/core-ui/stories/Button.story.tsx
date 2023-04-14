import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import { Button } from '../src';
import { makeStory } from './util';

export default {
	title: 'core-ui/Button',
	component: Button,
} as Meta;

const Template: Story<ComponentProps<typeof Button>> = (props) => (
	<Button {...props} />
);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const onClick = () => {};

export const PrimaryStyle = makeStory(Template, {
	children: 'Click Me!',
	onClick,
});

export const MinimalStyle = makeStory(Template, {
	children: 'Click Me!',
	onClick,
	style: 'minimal',
});
