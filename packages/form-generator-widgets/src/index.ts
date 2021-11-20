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
import { ChoiceWidget } from './choice';
import { EntityPickerWidget, EntityApi, EntityApiProvider } from './entity';

type ExtensionWidgets = Record<Widgets, React.FC<WidgetProps<any>>>;

export const widgets: WidgetLookup & ExtensionWidgets = {
	// Primitives
	number: NumberWidget,
	string: StringWidget,
	boolean: BooleanWidget,
	array: ArrayWidget,

	// Complex components
	Stat: StatWidget,
	EntityPicker: EntityPickerWidget,
	MultiEntityPicker: () => null,
	RichText: () => null,
	MultiChoice: () => null,
	Choice: ChoiceWidget,
	Icon: () => null,
	SchemaBuilder: () => null,
	NumericResource: () => null,
};

export { EntityApi, EntityApiProvider };
