import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { WidgetProps } from './FormGeneratorProps';

interface DebouncedWidgetProps<T> extends Omit<WidgetProps<T>, 'onChange'> {
  path: string;
  updateValue: (path: string, data: T) => void;
  value: T;
  aggregatedValue: T;
  hasAggregation: boolean;
  isEditable: boolean;
  Widget: React.FC<WidgetProps<T>>;
}

export const DebouncedWidget: React.FC<DebouncedWidgetProps<any>> = ({
	path,
	updateValue: propsUpdateValue,
	value: propsValue,
	Widget,
	label,
	aggregatedValue,
	isEditable,
	hasAggregation,
}) => {
	const [value, setValue] = useState(propsValue);

	useEffect(() => {
		setValue(propsValue);
	}, [propsValue]);

	const updateValue = useCallback(
		(data: any) => {
			setValue(data);
			propsUpdateValue(path, data);
		},
		[propsUpdateValue]
	);

	return (
		<Widget
			value={value}
			onChange={updateValue}
			label={label}
			aggregatedValue={aggregatedValue}
			isEditable={isEditable}
			hasAggregation={hasAggregation}
		/>
	);
};
