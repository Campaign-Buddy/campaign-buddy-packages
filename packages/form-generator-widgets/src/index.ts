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
	Stat: StatWidget,
	EntityPicker: EntityPickerWidget,
	MultiEntityPicker: MultiEntityPickerWidget,
	RichText: RichTextWidget,
	MultiChoice: MultiChoiceWidget,
	Choice: ChoiceWidget,
	Icon: () => null,
	SchemaBuilder: () => null,
	NumericResource: NumericResourceWidget,
};

export * from './FormWidgetProvider';
