import { Story } from '@storybook/react';

export function makeStory<TProps>(template: Story<TProps>, props: TProps) {
	const result = template.bind({});
	result.args = props;
	return result;
}
