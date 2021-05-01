import React from 'react';
import { WidgetProps } from './WidgetProps';

export interface WidgetLookup {
	string: React.FC<WidgetProps<string>>;
	number: React.FC<WidgetProps<number>>;
	boolean: React.FC<WidgetProps<boolean>>;
	object: React.FC<WidgetProps<any>>;
	array: React.FC<WidgetProps<any[]>>;

	[key: string]: React.FC<WidgetProps<any>>;
}
