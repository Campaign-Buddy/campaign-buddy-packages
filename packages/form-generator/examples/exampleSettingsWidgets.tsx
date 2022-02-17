import React, { useCallback, useState } from 'react';
import { WidgetLookup, WidgetProps } from '../src';
import {
	Flex,
	FormGroup,
	Input,
	NumberInput,
	Switch,
} from '@campaign-buddy/core-ui';

const StringWidget: React.FC<WidgetProps<string, string>> = ({
	value,
	onChange,
	label,
	aggregatedValue,
	isEditable,
	updateFieldSettings,
	fieldSettings,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const onBlur = useCallback(() => setIsFocused(false), []);
	const onFocus = useCallback(() => setIsFocused(true), []);

	const toggleAggregations = useCallback(() => {
		updateFieldSettings({
			...(fieldSettings ?? {}),
			aggregationSettings: !fieldSettings?.aggregationSettings,
		});
	}, [updateFieldSettings, fieldSettings]);

	return (
		<FormGroup label={label}>
			<Flex>
				<Input
					value={!isEditable || !isFocused ? aggregatedValue : value}
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					disabled={!isEditable}
				/>
				<button onClick={toggleAggregations}>
					{fieldSettings?.aggregationSettings
						? 'Enable aggregations'
						: 'Disable aggregations'}
				</button>
			</Flex>
		</FormGroup>
	);
};

const NumberWidget: React.FC<WidgetProps<number>> = ({
	value,
	onChange,
	label,
	aggregatedValue,
	isEditable,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const onBlur = useCallback(() => setIsFocused(false), []);
	const onFocus = useCallback(() => setIsFocused(true), []);

	return (
		<NumberInput
			value={!isEditable || !isFocused ? aggregatedValue : value}
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
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const onBlur = useCallback(() => setIsFocused(false), []);
	const onFocus = useCallback(() => setIsFocused(true), []);

	return (
		<Switch
			value={!isEditable || !isFocused ? aggregatedValue : value}
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
