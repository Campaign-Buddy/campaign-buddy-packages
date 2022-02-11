import {
	AggregatedDisplayText,
	AggregatedNumberInput,
	FormGroup,
} from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';
import { NumericResourceAggregate } from '@campaign-buddy/json-schema-core';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useAggregationContainsBase } from '../utility';

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

export const NumericResourceWidget: React.FC<
	WidgetProps<NumericResource, NumericResourceAggregate>
> = ({ value, aggregatedValue, aggregation, onChange, label }) => {
	const isMaxEditable = useAggregationContainsBase(aggregation?.max);
	const isCurrentEditable = useAggregationContainsBase(aggregation?.current);
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
				{isCurrentEditable ? (
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
				) : (
					<AggregatedDisplayText fontSize={20}>
						{aggregatedValue?.current ?? 0}
					</AggregatedDisplayText>
				)}
				{'/'}
				{isMaxEditable ? (
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
				) : (
					<AggregatedDisplayText fontSize={20}>
						{aggregatedValue?.max ?? 0}
					</AggregatedDisplayText>
				)}
			</NumericResourceContainer>
		</FormGroup>
	);
};
