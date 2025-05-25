import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import { LinkButton } from '../src';
import { makeStoryFn } from './util';

export default {
	title: 'core-ui/LinkButton',
	component: LinkButton,
} as Meta;

const Template: StoryFn<ComponentProps<typeof LinkButton>> = (props) => (
	<LinkButton {...props} />
);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const onClick = () => {};

export const PrimaryStyle = makeStoryFn(Template, {
	children: 'Click Me',
	onClick,
});
