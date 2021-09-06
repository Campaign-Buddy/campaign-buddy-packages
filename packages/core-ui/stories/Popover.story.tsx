import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Popover, Button } from '../src';

export default {
	title: 'core-ui/Popover',
	component: Popover,
} as Meta;

const Template: Story = () => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	return (
		<Popover
			content="I am content"
			onClose={() => setIsPopoverOpen(false)}
			isOpen={isPopoverOpen}
			placement="bottom"
		>
			<Button onClick={() => setIsPopoverOpen((prev) => !prev)}>
        Hi there
			</Button>
		</Popover>
	);
};

export const Primary = Template.bind({});
