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
	aggregation,
	aggregationSupport,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const onBlur = useCallback(() => setIsFocused(false), []);
	const onFocus = useCallback(() => setIsFocused(true), []);

	const toggleAggregations = useCallback(() => {
		updateFieldSettings?.({
			...(fieldSettings ?? {}),
			aggregationSettings: !(fieldSettings?.aggregationSettings ?? true),
		});
	}, [updateFieldSettings, fieldSettings]);

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
		/>
	);

	return (
		<FormGroup label={label}>
			{aggregationSupport ? (
				<Flex>
					{input}
					<button onClick={toggleAggregations}>
						{fieldSettings?.aggregationSettings === false
							? 'Enable aggregations'
							: 'Disable aggregations'}
					</button>
				</Flex>
			) : (
				input
			)}
		</FormGroup>
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
