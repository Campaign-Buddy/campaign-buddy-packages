import React from 'react';
import {
	NumberInput,
	AggregatedNumberInput,
	FormGroup,
	AggregatedDisplayText,
} from '@campaign-buddy/core-ui';
import { useAggregationContainsBase } from '../utility';
import { CBWidgetProps } from '../CBWidgetProps';

export const NumberWidget: React.FC<CBWidgetProps<number, string>> = ({
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
