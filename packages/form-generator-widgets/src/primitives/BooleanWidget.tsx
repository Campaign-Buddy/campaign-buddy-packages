import { Switch } from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';
import React from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	margin-bottom: 15px;
`;

export const BooleanWidget: React.FC<WidgetProps<boolean>> = ({
	value,
	aggregatedValue,
	onChange,
	label,
	aggregation,
}) => {
	return (
		<SwitchContainer>
			<Switch
				value={(aggregation ? aggregatedValue : value) ?? false}
				onChange={onChange}
				label={label}
				disabled={Boolean(aggregation)}
			/>
		</SwitchContainer>
	);
};
