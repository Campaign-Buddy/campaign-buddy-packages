import React from 'react';
import { NumberInput, AggregatedNumberInput } from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';

export const NumberWidget: React.FC<WidgetProps<number>> = ({
	value,
	aggregatedValue,
	hasAggregation,
	onChange,
	isEditable,
	label,
}) => {
	if (hasAggregation) {
		return (
			<AggregatedNumberInput
				value={value ?? 0}
				aggregatedDisplayValue={`${aggregatedValue ?? 0}`}
				onChange={onChange}
				label={label}
				baseValueLabel="Additional modifier"
			/>
		);
	}

	return (
		<NumberInput
			value={value ?? 0}
			onChange={onChange}
			label={label}
			disabled={!isEditable}
		/>
	);
};
