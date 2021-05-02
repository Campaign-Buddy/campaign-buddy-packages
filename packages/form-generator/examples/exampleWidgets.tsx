import React from 'react';
import { WidgetLookup, WidgetProps } from '../src';

const StringWidget: React.FC<WidgetProps<string>> = ({ value, onChange, label }) => (
	<input
		style={{ display: 'block' }}
		value={value}
		onChange={e => onChange((e.target as any).value)}
		placeholder={label}
	/>
);

const NumberWidget: React.FC<WidgetProps<number>> = ({ value, onChange, label }) => (
	<input
		style={{ display: 'block' }}
		value={value}
		onChange={e => onChange(parseInt((e.target as any).value))}
		type="number"
		placeholder={label}
	/>
);

const BooleanWidget: React.FC<WidgetProps<boolean>> = ({ value, onChange, label }) => (
	<div>
		<input
			checked={value}
			onChange={e => onChange((e.target as any).checked)}
			type="checkbox"
		/>
		<label>{label}</label>
	</div>
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
