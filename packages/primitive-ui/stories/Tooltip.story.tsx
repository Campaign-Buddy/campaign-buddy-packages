import { Meta } from '@storybook/react';
import { Tooltip, TooltipProps } from '../src';

export default {
	title: 'primitive-ui/Tooltip',
	component: Tooltip,
} as Meta;

export const Primary = (props: TooltipProps) => {
	return (
		<div>
			<Tooltip {...props}>
				<Tooltip.Reference>Hover me!</Tooltip.Reference>
				<Tooltip.Content>I am a cool and informative tooltip!</Tooltip.Content>
			</Tooltip>
		</div>
	);
};
