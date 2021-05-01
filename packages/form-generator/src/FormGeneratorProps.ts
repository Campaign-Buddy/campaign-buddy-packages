import { JSONSchema4 } from 'json-schema';
import { UiLayout } from '@campaign-buddy/json-schema-core';
import { WidgetLookup } from './widgets';

export interface FormGeneratorProps {
	schema: JSONSchema4;
	data: any;
	onChange: (data: any) => void;
	widgets: WidgetLookup;
	uiLayout?: UiLayout;
}
