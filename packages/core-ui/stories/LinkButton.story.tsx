import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import { LinkButton } from '../src';
import { makeStory } from './util';

export default {
	title: 'core-ui/LinkButton',
	component: LinkButton,
} as Meta;

const Template: Story<ComponentProps<typeof LinkButton>> = (props) => (
	<LinkButton {...props} />
);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const onClick = () => {};

export const PrimaryStyle = makeStory(Template, {
	children: 'Click Me',
	onClick,
});
