import {
	AggregatedDisplayText,
	FormGroup,
	IOption,
	Select,
} from '@campaign-buddy/core-ui';
import { ChoiceAggregation } from '@campaign-buddy/json-schema-core';
import { WidgetProps } from '@campaign-buddy/form-generator';
import React, { useCallback, useMemo } from 'react';
import { Option } from './Option';
import { aggregationContainsBase } from '../utility';

interface Choice {
	options?: Option[];
	selectedOption?: Option;
}

export const ChoiceWidget: React.FC<WidgetProps<Choice, ChoiceAggregation>> = ({
	value,
	onChange,
	aggregatedValue,
	schema,
	label,
	aggregation,
}) => {
	const isEditable = useMemo(
		() => aggregationContainsBase(aggregation?.selectedOption),
		[aggregation]
	);

	const options = useMemo(
		() =>
			[
				...(value?.options ?? []),
				...(aggregatedValue?.options ?? []),
				...(schema?.$options?.map((o) => ({
					displayValue: o,
					id: `#defaultOption-${o}`,
				})) ?? []),
			].filter((x): x is IOption => Boolean(x.id && x.displayValue)),
		[value?.options, aggregatedValue?.options, schema?.$options]
	);

	const handleChange = useCallback(
		(newValue: IOption) => {
			onChange({
				...value,
				selectedOption: newValue,
			});
		},
		[onChange, value]
	);

	const mappedValue = useMemo(() => {
		if (!aggregatedValue?.selectedOption?.id && !value?.selectedOption?.id) {
			return;
		}

		const selectedDisplayValue =
			aggregatedValue?.selectedOption?.displayValue ??
			value?.selectedOption?.displayValue;

		const selectedOptionId =
			aggregation && isEditable
				? value?.selectedOption?.id ?? aggregatedValue?.selectedOption?.id
				: aggregatedValue?.selectedOption?.id ?? value?.selectedOption?.id;

		return {
			id: selectedOptionId ?? '',
			displayValue: selectedDisplayValue ?? '',
		};
	}, [
		aggregatedValue?.selectedOption,
		value?.selectedOption,
		aggregation,
		isEditable,
	]);

	if (aggregation && !isEditable) {
		return (
			<FormGroup label={label}>
				<AggregatedDisplayText>
					{mappedValue?.displayValue}
				</AggregatedDisplayText>
			</FormGroup>
		);
	}

	return (
		<Select
			options={options}
			value={mappedValue}
			onChange={handleChange}
			label={label}
			isDisabled={!isEditable}
		/>
	);
};
