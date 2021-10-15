import { IOption, Select } from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';
import React, { useCallback, useMemo } from 'react';
import { Option } from './Option';

interface Choice {
	options?: Option[];
	selectedOption?: Option;
}

export const ChoiceWidget: React.FC<WidgetProps<Choice>> = ({
	value,
	onChange,
	aggregatedValue,
	schema,
	label,
}) => {
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

	const mappedValue = useMemo(
		() =>
			value?.selectedOption && {
				id: value?.selectedOption?.id ?? '',
				displayValue: value?.selectedOption?.displayValue ?? '',
			},
		[value?.selectedOption]
	);

	return (
		<Select
			options={options}
			value={mappedValue}
			onChange={handleChange}
			label={label}
		/>
	);
};
