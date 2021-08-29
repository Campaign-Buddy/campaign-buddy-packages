import React from 'react';
import { Widgets } from '@campaign-buddy/json-schema-core';
import { WidgetProps, WidgetLookup } from '@campaign-buddy/form-generator';

type ExtensionWidgets = Record<Widgets, React.FC<WidgetProps<any>>>;

export const widgets: WidgetLookup & ExtensionWidgets = {
	// Primitives
	number: () => null,
	string: () => null,
	boolean: () => null,
	array: ()=> null,

	// Complex components
	Stat: () => null,
	EntityPicker: () => null,
	RichText: () => null,
	MultiSelect: () => null,
	Select: () => null,
	Icon: () => null,
	SchemaBuilder: () => null,
	NumericResource: () => null,
};
