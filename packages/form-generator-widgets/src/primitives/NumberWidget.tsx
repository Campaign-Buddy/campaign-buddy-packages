import React from 'react';
import {
	NumberInput,
	AggregatedNumberInput,
	FormGroup,
	AggregatedDisplayText,
} from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';
import { useAggregationContainsBase } from '../utility';

export const NumberWidget: React.FC<WidgetProps<number, string>> = ({
	value,
	aggregatedValue,
	aggregation,
	onChange,
	label,
}) => {
	const isEditable = useAggregationContainsBase(aggregation);

	if (aggregation && !isEditable) {
		return (
			<FormGroup label={label}>
				<AggregatedDisplayText>{aggregatedValue ?? 0}</AggregatedDisplayText>
			</FormGroup>
		);
	}

	if (aggregation) {
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
