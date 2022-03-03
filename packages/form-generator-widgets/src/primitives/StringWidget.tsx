import React from 'react';
import {
	Input,
	AggregatedTextInput,
	AggregatedDisplayText,
} from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';

export const StringWidget: React.FC<WidgetProps<string>> = ({
	value,
	aggregatedValue,
	hasAggregation,
	onChange,
	isEditable,
}) => {
	if (hasAggregation && !isEditable) {
		return (
			<AggregatedDisplayText>{aggregatedValue ?? ''}</AggregatedDisplayText>
		);
	}

	if (hasAggregation) {
		return (
			<AggregatedTextInput
				value={value ?? ''}
				aggregatedDisplayValue={aggregatedValue ?? ''}
				onChange={onChange}
			/>
		);
	}

	return (
		<Input value={value ?? ''} onChange={onChange} disabled={!isEditable} />
	);
};
