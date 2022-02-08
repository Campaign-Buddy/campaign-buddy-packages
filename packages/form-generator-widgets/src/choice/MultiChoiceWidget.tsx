import { IOption, MultiSelect } from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';
import React, { useCallback, useMemo } from 'react';
import { Option } from './Option';

interface MultiChoice {
	options?: Option[];
	selectedOptions?: Option[];
	maxChoices?: number;
}

export const MultiChoiceWidget: React.FC<WidgetProps<MultiChoice>> = ({
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
		(_: IOption[], added: IOption[], removed: IOption[]) => {
			const newValues = [...(value?.selectedOptions ?? [])];

			const removedIndexes = removed
				.map(({ id }) => newValues.findIndex((x) => id === x.id))
				.filter((x) => x !== -1);

			for (const index of removedIndexes) {
				newValues.splice(index, 1);
			}

			onChange({
				...value,
				selectedOptions: [...newValues, ...added],
			});
		},
		[onChange, value]
	);

	const mappedValue = useMemo(
		() =>
			(aggregatedValue?.selectedOptions ?? value?.selectedOptions)?.map(
				(x) => ({
					id: x?.id ?? '',
					displayValue: x?.displayValue ?? '',
				})
			),
		[aggregatedValue?.selectedOptions, value?.selectedOptions]
	);

	return (
		<MultiSelect
			options={options}
			value={mappedValue}
			onChange={handleChange}
			label={label}
		/>
	);
};
