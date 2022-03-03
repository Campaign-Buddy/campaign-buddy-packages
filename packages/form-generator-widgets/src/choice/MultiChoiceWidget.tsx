import { FormGroup, IOption, MultiSelect, Tag } from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';
import { MultiChoiceAggregation } from '@campaign-buddy/json-schema-core';
import React, { useCallback, useMemo } from 'react';
import { useAggregationContainsBase, TagContainer } from '../utility';
import { Option } from './Option';

interface MultiChoice {
	options?: Option[];
	selectedOptions?: Option[];
	maxChoices?: number;
}

export const MultiChoiceWidget: React.FC<
	WidgetProps<MultiChoice, MultiChoiceAggregation>
> = ({ value, onChange, aggregatedValue, schema, label, aggregation }) => {
	const isEditable = useAggregationContainsBase(aggregation?.selectedOptions);

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

	if (!isEditable && aggregation) {
		return (
			<FormGroup label={label}>
				<TagContainer>
					{aggregatedValue?.selectedOptions
						?.filter((x) => x?.displayValue && x.id)
						.map((x) => (
							<Tag key={x.id}>{x.displayValue}</Tag>
						))}
				</TagContainer>
			</FormGroup>
		);
	}

	return (
		<MultiSelect
			options={options}
			value={mappedValue}
			onChange={handleChange}
			label={label}
		/>
	);
};
