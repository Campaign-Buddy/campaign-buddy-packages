import React from 'react';
import { Widgets } from '@campaign-buddy/json-schema-core';
import { WidgetProps, WidgetLookup } from '@campaign-buddy/form-generator';

import {
	ArrayWidget,
	BooleanWidget,
	NumberWidget,
	StringWidget,
} from './primitives';
import { StatWidget } from './stat';
import { ChoiceWidget, MultiChoiceWidget } from './choice';
import { EntityPickerWidget, MultiEntityPickerWidget } from './entity';
import { NumericResourceWidget } from './numericResource';
import { RichTextWidget } from './richText';
import { withWidgetLabel } from './utility';

type ExtensionWidgets = Record<Widgets, React.FC<WidgetProps<any>>>;

export const widgets: WidgetLookup & ExtensionWidgets = {
	// Primitives
	number: withWidgetLabel(NumberWidget),
	string: withWidgetLabel(StringWidget),
	boolean: withWidgetLabel(BooleanWidget),
	array: ArrayWidget,

	// Complex components
	Stat: withWidgetLabel(StatWidget, [
		{
			label: 'Compute base value?',
			path: '$.base',
		},
		{
			label: 'Compute bonus value?',
			path: '$.bonus',
		},
	]),
	EntityPicker: withWidgetLabel(EntityPickerWidget, [
		{
			label: 'Compute selected value?',
			path: '$.entity',
		},
		{
			label: 'Compute available options?',
			path: '$.availableEntityIds',
		},
	]),
	MultiEntityPicker: withWidgetLabel(MultiEntityPickerWidget, [
		{
			label: 'Compute selected values?',
			path: '$.entities',
		},
		{
			label: 'Compute available options?',
			path: '$.availableEntityIds',
		},
	]),
	RichText: RichTextWidget,
	MultiChoice: withWidgetLabel(MultiChoiceWidget, [
		{
			label: 'Compute selected values?',
			path: '$.selectedOptions',
		},
	]),
	Choice: withWidgetLabel(ChoiceWidget, [
		{
			label: 'Compute selected value?',
			path: '$.selectedOption',
		},
	]),
	Icon: () => null,
	SchemaBuilder: () => null,
	NumericResource: withWidgetLabel(NumericResourceWidget, [
		{
			label: 'Compute current value?',
			path: '$.current',
		},
		{
			label: 'Compute max value?',
			path: '$.max',
		},
	]),
};

export * from './FormWidgetProvider';
