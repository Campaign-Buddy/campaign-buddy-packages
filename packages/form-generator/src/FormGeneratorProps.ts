import { JSONSchema4 } from 'json-schema';
import { UiLayout } from '@campaign-buddy/json-schema-core';

export interface WidgetLookup {
	string: React.FC<WidgetProps<string>>;
	number: React.FC<WidgetProps<number>>;
	boolean: React.FC<WidgetProps<boolean>>;
	object: React.FC<WidgetProps<any>>;
	array: React.FC<WidgetProps<any[]>>;

	[key: string]: React.FC<WidgetProps<any>>;
}

export interface WidgetProps<T> {
	value: T;
	onChange: (value: T) => void;
	label: string;
	FormGenerator: React.FC<FormGeneratorProps>;
}

export interface FormGeneratorProps {
	schema: JSONSchema4;
	data: any;
	onChange: (data: any) => void;
	widgets: WidgetLookup;
	uiLayout?: UiLayout;
}
