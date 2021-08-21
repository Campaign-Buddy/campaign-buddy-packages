import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { WidgetProps } from './FormGeneratorProps';

interface DebouncedWidgetProps<T> extends Omit<WidgetProps<T>, 'onChange'> {
	path: string;
	updateValue: (path: string, data: T) => void;

	/**
	 * The value from the form data (i.e.
	 * what has been passed into `updateValue`)
	 */
	value: T;

	/**
	 * The value to display if not being edited,
	 * may simply be `value`, may be derived from
	 * a combination of `value` and other data, 
	 * or may be completely derived from other data
	 */
	aggregatedValue: T;

	/**
	 * A property is editable if has no aggregations
	 * _or_ it's aggregations contain the <base> keyword
	 */
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
}) => {
	const [value, setValue] = useState(propsValue);

	useEffect(() => {
		setValue(propsValue);
	}, [propsValue]);

	const updateValue = useCallback((data: any) => {
		setValue(data);
		propsUpdateValue(path, data);
	}, [propsUpdateValue]);

	return (
		<Widget
			value={value}
			onChange={updateValue}
			label={label}
			aggregatedValue={aggregatedValue}
			isEditable={isEditable}
		/>
	)
};
