import React, { useCallback, useState } from 'react';
import { WidgetLookup, WidgetProps } from '../src';
import { Input, NumberInput, Switch } from '@campaign-buddy/core-ui';

const StringWidget: React.FC<WidgetProps<string>> = ({
	value,
	onChange,
	label,
	aggregatedValue,
	aggregation,
	isEditable,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const onBlur = useCallback(() => setIsFocused(false), []);
	const onFocus = useCallback(() => setIsFocused(true), []);

	return (
		<Input
			value={
				(!isEditable || !isFocused) && aggregation
					? aggregatedValue ?? ''
					: value ?? ''
			}
			onChange={onChange}
			label={label}
			onFocus={onFocus}
			onBlur={onBlur}
			disabled={!isEditable}
		/>
	);
};

const NumberWidget: React.FC<WidgetProps<number>> = ({
	value,
	onChange,
	label,
	aggregatedValue,
	aggregation,
	isEditable,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const onBlur = useCallback(() => setIsFocused(false), []);
	const onFocus = useCallback(() => setIsFocused(true), []);

	return (
		<NumberInput
			value={
				(!isEditable || !isFocused) && aggregation
					? aggregatedValue ?? 0
					: value ?? 0
			}
			onChange={onChange}
			label={label}
			onFocus={onFocus}
			onBlur={onBlur}
			disabled={!isEditable}
		/>
	);
};

const BooleanWidget: React.FC<WidgetProps<boolean>> = ({
	value,
	onChange,
	label,
	isEditable,
	aggregatedValue,
	aggregation,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const onBlur = useCallback(() => setIsFocused(false), []);
	const onFocus = useCallback(() => setIsFocused(true), []);

	return (
		<Switch
			value={
				(!isEditable || !isFocused) && aggregation
					? aggregatedValue ?? false
					: value ?? false
			}
			onChange={onChange}
			label={label}
			onFocus={onFocus}
			onBlur={onBlur}
			disabled={!isEditable}
		/>
	);
};

const AraryWidget: React.FC<WidgetProps<any>> = () => (
	<p>Not implemented yet</p>
);

export const exampleWidgets: WidgetLookup = {
	string: StringWidget,
	number: NumberWidget,
	boolean: BooleanWidget,
	array: AraryWidget,
	randoType: StringWidget,
};
