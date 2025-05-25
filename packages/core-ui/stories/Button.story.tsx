import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import { Button } from '../src';
import { makeStoryFn } from './util';

export default {
	title: 'core-ui/Button',
	component: Button,
} as Meta;

const Template: StoryFn<ComponentProps<typeof Button>> = (props) => (
	<Button {...props} />
);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const onClick = () => {};

export const PrimaryStyle = makeStoryFn(Template, {
	children: 'Click Me!',
	onClick,
});

export const MinimalStyle = makeStoryFn(Template, {
	children: 'Click Me!',
	onClick,
	variant: 'minimal',
});
