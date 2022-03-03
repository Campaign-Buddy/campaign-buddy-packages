import { FormGroup, Switch } from '@campaign-buddy/core-ui';
import React from 'react';
import { CBWidgetProps } from '../CBWidgetProps';

export const BooleanWidget: React.FC<CBWidgetProps<boolean, string>> = ({
	value,
	aggregatedValue,
	onChange,
	label,
	aggregation,
}) => {
	return (
		<FormGroup label={label} labelFor="">
			<Switch
				value={(aggregation ? aggregatedValue : value) ?? false}
				onChange={onChange}
				disabled={Boolean(aggregation)}
			/>
		</FormGroup>
	);
};
