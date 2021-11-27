import { AggregatedNumberInput, FormGroup } from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const NumericResourceContainer = styled.div`
	display: flex;
	gap: 4px;
	align-items: center;
	font-size: 20px;
`;

interface NumericResource {
	current?: number;
	max?: number;
}

export const NumericResourceWidget: React.FC<WidgetProps<NumericResource>> = ({
	value,
	aggregatedValue,
	aggregation,
	onChange,
	label,
}) => {
	const max = aggregatedValue?.max ?? value?.max ?? 0;
	const current = aggregatedValue?.current ?? value?.current ?? 0;

	const onMaxChange = useCallback(
		(newMax: number) => {
			onChange({
				...value,
				max: newMax,
			});
		},
		[onChange, value]
	);

	const onCurrentChange = useCallback(
		(newCurrent: number) => {
			onChange({
				...value,
				current: newCurrent,
			});
		},
		[onChange, value]
	);

	const maxHasAggregation =
		typeof aggregation === 'object' && aggregation['max'];

	const currentHasAggregation =
		typeof aggregation === 'object' && aggregation['current'];

	return (
		<FormGroup label={label}>
			<NumericResourceContainer>
				<AggregatedNumberInput
					value={value?.current ?? 0}
					aggregatedDisplayValue={`${current}`}
					onChange={onCurrentChange}
					hideButton
					baseValueLabel={
						currentHasAggregation ? `${label} modifier` : `${label} (current)`
					}
					fontSize={20}
				/>
				{'/'}
				<AggregatedNumberInput
					value={value?.max ?? 0}
					aggregatedDisplayValue={`${max}`}
					onChange={onMaxChange}
					hideButton
					baseValueLabel={
						maxHasAggregation
							? `${label} maximum modifier`
							: `${label} (maximum value)`
					}
					fontSize={20}
				/>
			</NumericResourceContainer>
		</FormGroup>
	);
};
