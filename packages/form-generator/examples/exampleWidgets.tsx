import React, { useCallback, useState } from 'react';
import { WidgetLookup, WidgetProps } from '../src';
import {
	ContextMenu,
	Input,
	NumberInput,
	Switch,
	MenuItem,
} from '@campaign-buddy/core-ui';
import { AggregationSupport } from '../src/AggregationSupport';
import { FieldSettings } from '@campaign-buddy/frontend-types';

const adminRole = 'gm';
const nonAdminRole = 'player';

const StringWidget: React.FC<
	React.PropsWithChildren<WidgetProps<string, string>>
> = ({
	value,
	onChange,
	label,
	aggregatedValue,
	updateFieldSettings,
	fieldSettings,
	aggregation,
	aggregationSupport,
	currentUserRole,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const onBlur = useCallback(() => setIsFocused(false), []);
	const onFocus = useCallback(() => setIsFocused(true), []);

	return (
		<WithFieldSettings
			aggregationSupport={aggregationSupport}
			updateFieldSettings={updateFieldSettings}
			currentUserRole={currentUserRole}
			fieldSettings={fieldSettings}
		>
			<Input
				value={!isFocused && aggregation ? aggregatedValue ?? '' : value ?? ''}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				label={label}
			/>
		</WithFieldSettings>
	);
};

const NumberWidget: React.FC<React.PropsWithChildren<WidgetProps<number>>> = ({
	value,
	onChange,
	label,
	aggregatedValue,
	aggregation,
	aggregationSupport,
	updateFieldSettings,
	currentUserRole,
	fieldSettings,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const onBlur = useCallback(() => setIsFocused(false), []);
	const onFocus = useCallback(() => setIsFocused(true), []);

	return (
		<WithFieldSettings
			aggregationSupport={aggregationSupport}
			updateFieldSettings={updateFieldSettings}
			currentUserRole={currentUserRole}
			fieldSettings={fieldSettings}
		>
			<NumberInput
				value={!isFocused && aggregation ? aggregatedValue ?? 0 : value ?? 0}
				onChange={onChange}
				label={label}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		</WithFieldSettings>
	);
};

const BooleanWidget: React.FC<React.PropsWithChildren<WidgetProps<boolean>>> =
	({
		value,
		onChange,
		label,
		aggregatedValue,
		aggregation,
		aggregationSupport,
		updateFieldSettings,
		currentUserRole,
		fieldSettings,
	}) => {
		const [isFocused, setIsFocused] = useState(false);
		const onBlur = useCallback(() => setIsFocused(false), []);
		const onFocus = useCallback(() => setIsFocused(true), []);

		return (
			<WithFieldSettings
				aggregationSupport={aggregationSupport}
				updateFieldSettings={updateFieldSettings}
				currentUserRole={currentUserRole}
				fieldSettings={fieldSettings}
			>
				<Switch
					value={
						!isFocused && aggregation
							? aggregatedValue ?? false
							: value ?? false
					}
					onChange={onChange}
					label={label}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			</WithFieldSettings>
		);
	};

const AraryWidget: React.FC<React.PropsWithChildren<WidgetProps<any>>> = () => (
	<p>Derp</p>
);

export const exampleWidgets: WidgetLookup = {
	string: StringWidget,
	number: NumberWidget,
	boolean: BooleanWidget,
	array: AraryWidget,
	randoType: StringWidget,
};

interface WithFieldSettingsProps<TAggregation> {
	aggregationSupport: AggregationSupport<TAggregation>;
	fieldSettings: FieldSettings<TAggregation> | undefined;
	currentUserRole: string | undefined;
	updateFieldSettings:
		| ((fieldSettings: FieldSettings<TAggregation>) => void)
		| undefined;
}

const WithFieldSettings: React.FC<
	React.PropsWithChildren<WithFieldSettingsProps<any>>
> = ({
	aggregationSupport,
	fieldSettings,
	currentUserRole,
	updateFieldSettings,
	children,
}) => {
	const menuItems: MenuItem[] = [];

	if (
		currentUserRole === adminRole &&
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

	if (currentUserRole === adminRole && updateFieldSettings) {
		const updateVisibility = (roles?: string[]) => {
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
					displayText: 'Game master only',
					icon: fieldSettings?.visibleRoles?.length === 1 ? 'tick' : 'blank',
					onClick: () => updateVisibility([adminRole]),
					shouldCloseMenuOnClick: false,
				},
				{
					displayText: 'Everyone',
					icon: fieldSettings?.visibleRoles?.length === 2 ? 'tick' : 'blank',
					onClick: () => updateVisibility([adminRole, nonAdminRole]),
					shouldCloseMenuOnClick: false,
				},
			],
		});
	}

	return menuItems.length ? (
		<ContextMenu menuItems={menuItems}>{children}</ContextMenu>
	) : (
		<>{children}</>
	);
};
