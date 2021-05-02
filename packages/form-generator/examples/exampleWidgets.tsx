import React from 'react';
import { WidgetLookup, WidgetProps } from '../src';

const StringWidget: React.FC<WidgetProps<string>> = ({ value, onChange }) => (
	<input value={value} onChange={e => onChange((e.target as any).value)} />
);

const NumberWidget: React.FC<WidgetProps<number>> = ({ value, onChange }) => (
	<input value={value} onChange={e => onChange(parseInt((e.target as any).value))} type="number" />
);

const BooleanWidget: React.FC<WidgetProps<boolean>> = ({ value, onChange }) => (
	<input checked={value} onChange={e => onChange((e.target as any).checked)} type="checkbox" />
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
