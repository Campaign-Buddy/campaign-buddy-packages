import { Meta } from '@storybook/react';
import { FormGroup } from '../src';

export default {
	title: 'core-ui/FormGroup',
	component: FormGroup,
} as Meta;

export const Primary = () => (
	<FormGroup label="I am a form control" labelFor="someinput">
		<input id="someinput" />
	</FormGroup>
);

export const WithElementLabel = () => (
	<FormGroup
		label={
			<span>
				I am using <i>JSX!</i>!
			</span>
		}
		labelFor="someinput2"
	>
		<input id="someinput2" />
	</FormGroup>
);
