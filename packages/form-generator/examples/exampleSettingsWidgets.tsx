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
	currentUserRole,
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

	if (
		currentUserRole === 'admin' &&
		aggregationSupport &&
		updateFieldSettings
	) {
		menuItems.push({
			displayText: 'Compute this field?',
			icon: fieldSettings?.aggregationSettings === false ? 'blank' : 'tick',
			onClick: () => {
				updateFieldSettings({
					...(fieldSettings ?? {}),
					aggregationSettings: !(fieldSettings?.aggregationSettings ?? true),
				});
			},
			shouldCloseMenuOnClick: false,
		});
	}

	if (currentUserRole === 'admin' && updateFieldSettings) {
		const updateVisibility = (roles?: ('admin' | 'non-admin')[]) => {
			updateFieldSettings({
				...(fieldSettings ?? {}),
				visibleRoles: roles,
			});
		};

		menuItems.push({
			displayText: 'Visibility settings',
			icon: 'eye-open',
			subItems: [
				{
					displayText: 'Use default settings',
					icon: !fieldSettings?.visibleRoles ? 'tick' : 'blank',
					onClick: () => updateVisibility(),
					shouldCloseMenuOnClick: false,
				},
				{
					displayText: 'Only admins',
					icon: fieldSettings?.visibleRoles?.length === 1 ? 'tick' : 'blank',
					onClick: () => updateVisibility(['admin']),
					shouldCloseMenuOnClick: false,
				},
				{
					displayText: 'Everyone',
					icon: fieldSettings?.visibleRoles?.length === 2 ? 'tick' : 'blank',
					onClick: () => updateVisibility(['admin', 'non-admin']),
					shouldCloseMenuOnClick: false,
				},
			],
		});
	}

	return menuItems.length ? (
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
