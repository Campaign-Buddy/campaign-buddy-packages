import React, { useCallback, useState } from 'react';
import { WidgetLookup, WidgetProps } from '../src';
import {
	ContextMenu,
	Input,
	NumberInput,
	Switch,
	MenuItem,
} from '@campaign-buddy/core-ui';

const StringWidget: React.FC<WidgetProps<string, string>> = ({
	value,
	onChange,
	label,
	aggregatedValue,
	isEditable,
	updateFieldSettings,
	fieldSettings,
	aggregation,
	aggregationSupport,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const onBlur = useCallback(() => setIsFocused(false), []);
	const onFocus = useCallback(() => setIsFocused(true), []);

	const input = (
		<Input
			value={
				(!isEditable || !isFocused) && aggregation
					? aggregatedValue ?? ''
					: value ?? ''
			}
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur}
			disabled={!isEditable}
			label={label}
		/>
	);

	const menuItems: MenuItem[] = [];

	if (aggregationSupport) {
		menuItems.push({
			displayText: 'Compute this field?',
			icon: fieldSettings?.aggregationSettings === false ? 'blank' : 'tick',
			onClick: () => {
				updateFieldSettings?.({
					...(fieldSettings ?? {}),
					aggregationSettings: !(fieldSettings?.aggregationSettings ?? true),
				});
			},
			shouldCloseMenuOnClick: false,
		});
	}

	return aggregationSupport && updateFieldSettings ? (
		<ContextMenu menuItems={menuItems}>{input}</ContextMenu>
	) : (
		input
	);
};

const NumberWidget: React.FC<WidgetProps<number>> = ({
	value,
	onChange,
	label,
	aggregatedValue,
	isEditable,
	aggregation,
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

const AraryWidget: React.FC<WidgetProps<any>> = () => <p>Derp</p>;

export const exampleWidgets: WidgetLookup = {
	string: StringWidget,
	number: NumberWidget,
	boolean: BooleanWidget,
	array: AraryWidget,
	randoType: StringWidget,
};
