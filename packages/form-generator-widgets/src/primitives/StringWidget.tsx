import React from 'react';
import {
	Input,
	AggregatedTextInput,
	AggregatedDisplayText,
} from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';
import { useAggregationContainsBase } from '../utility';

export const StringWidget: React.FC<WidgetProps<string, string>> = ({
	value,
	aggregatedValue,
	onChange,
	aggregation,
}) => {
	const isEditable = useAggregationContainsBase(aggregation);

	if (aggregation && !isEditable) {
		return (
			<AggregatedDisplayText>{aggregatedValue ?? ''}</AggregatedDisplayText>
		);
	}

	if (aggregation) {
		return (
			<AggregatedTextInput
				value={value ?? ''}
				aggregatedDisplayValue={aggregatedValue ?? ''}
				onChange={onChange}
			/>
		);
	}

	return <Input value={value ?? ''} onChange={onChange} />;
};
