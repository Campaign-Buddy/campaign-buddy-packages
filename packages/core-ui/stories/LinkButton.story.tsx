import { StoryFn, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import { LinkButton } from '../src';
import { makeStory } from './util';

export default {
	title: 'core-ui/LinkButton',
	component: LinkButton,
} as Meta;

const Template: StoryFn<ComponentProps<typeof LinkButton>> = (props) => (
	<LinkButton {...props} />
);

const onClick = () => {};

export const PrimaryStyle = makeStory(Template, {
	children: 'Click Me',
	onClick,
});
