import React from 'react';
import { WidgetLookup, WidgetProps } from '../src';
import {
	Input,
	NumberInput,
	Switch,
} from '@campaign-buddy/core-ui';

const StringWidget: React.FC<WidgetProps<string>> = ({ value, onChange, label }) => (
	<Input
		value={value}
		onChange={onChange}
		label={label}
	/>
);

const NumberWidget: React.FC<WidgetProps<number>> = ({ value, onChange, label }) => (
	<NumberInput
		value={value}
		onChange={onChange}
		label={label}
	/>
);

const BooleanWidget: React.FC<WidgetProps<boolean>> = ({ value, onChange, label }) => (
	<Switch
		value={value}
		onChange={onChange}
		label={label}
	/>
);

const AraryWidget: React.FC<WidgetProps<any>> = () => (
	<p>Derp</p>
);

export const exampleWidgets: WidgetLookup = {
	string: StringWidget,
	number: NumberWidget,
	boolean: BooleanWidget,
	array: AraryWidget,
};
