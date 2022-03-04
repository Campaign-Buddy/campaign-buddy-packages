import { WidgetProps } from '@campaign-buddy/form-generator';
import React from 'react';

export interface CBWidgetProps<TValue, TAggregates>
	extends Omit<WidgetProps<TValue, TAggregates>, 'label'> {
	label: React.ReactNode;
	rawLabel: string;
}
