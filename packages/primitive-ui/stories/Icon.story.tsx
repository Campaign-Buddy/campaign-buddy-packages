import { Meta } from '@storybook/react';
import { Icon, IconProps } from '../src';

export default {
	component: Icon,
	title: 'primitive-ui/Icon',
	argTypes: {
		name: {
			control: { type: 'select' },
			defaultValue: 'profile',
		},
		size: {
			defaultValue: 18,
		},
	},
} as Meta;

export function Primary(args: IconProps) {
	return <Icon {...args} />;
}
