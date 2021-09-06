import { Switch } from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';
import React from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
`;

export const BooleanWidget: React.FC<WidgetProps<boolean>> = ({
	value,
	aggregatedValue,
	onChange,
	label,
	hasAggregation,
}) => {
	return (
		<SwitchContainer>
			<Switch
				value={hasAggregation ? aggregatedValue : value}
				onChange={onChange}
				label={label}
				disabled={hasAggregation}
			/>
		</SwitchContainer>
	);
}
