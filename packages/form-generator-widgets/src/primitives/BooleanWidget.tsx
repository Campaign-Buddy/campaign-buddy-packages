import { Switch, FormGroup, Text } from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';
import React from 'react';

export const BooleanWidget: React.FC<WidgetProps<boolean>> = ({
	value,
	aggregatedValue,
	onChange,
	label,
	hasAggregation,
}) => {
	return (
		<Switch
			value={hasAggregation ? aggregatedValue : value}
			onChange={onChange}
			label={label}
			disabled={hasAggregation}
		/>
	);
}
