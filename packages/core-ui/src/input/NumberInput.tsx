import React, { useCallback, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import mexpr from 'math-expression-evaluator';
import { Keys, InputGroup, ButtonGroup, Classes } from '@blueprintjs/core';
import { Button } from '../button';
import { FormGroup } from '../form-group';
import { defaultTheme } from '../theme';
import { useHtmlId } from '../hooks';
import { BaseInputProps } from '../BaseInputProps';
import { baseInputStyles } from './Input.styled';

const StyledInput = styled(InputGroup)`
	input {
		${baseInputStyles}
	}

	& .bp4-button {
		margin: 1px !important;

		&:first-child {
			border-radius: 0 3px 0 0 !important;
		}

		&:last-child {
			border-radius: 0 0 3px 0 !important;
		}
	}
`;

StyledInput.defaultProps = {
	theme: defaultTheme,
};

type NumberInputProps = BaseInputProps<number>;

export const NumberInput: React.FC<
	React.PropsWithChildren<NumberInputProps>
> = ({
	value,
	label,
	onChange,
	onBlur: onBlurProps,
	onKeyDown: onKeyDownProps,
	id: idProp,
	...rest
}) => {
	const [internalValue, setInternalValue] = useState(`${value ?? 0}`);
	const generatedId = useHtmlId();
	const id = idProp ?? generatedId;
	const theme = useTheme();

	// When the value is changed from the outside, then
	// we want to update our internal input
	useEffect(() => {
		setInternalValue(`${value ?? 0}`);
	}, [value]);

	const onConfirm = useCallback(() => {
		try {
			const cleaned = internalValue.replace(
				/(\d+)?d(\d+)/g,
				(match, quantityRaw, diceRaw) => {
					const quantity = parseInt(quantityRaw ?? '1');
					const dice = parseInt(diceRaw);

					let sum = 0;
					for (let i = 0; i < quantity; i++) {
						sum += Math.floor(Math.random() * dice) + 1;
					}

					return `${sum}`;
				}
			);

			const val = parseFloat(mexpr.eval(cleaned));

			if (isNaN(val)) {
				return val;
			}

			onChange(val);
		} catch {
			/* :shrug: */
		}
	}, [internalValue, onChange]);

	const step = useCallback(
		(value: number) => {
			const internalNumValue = parseFloat(internalValue);
			if (isNaN(internalNumValue)) {
				setInternalValue(`${value}`);
				onChange(value);
			} else {
				setInternalValue(`${internalNumValue + value}`);
				onChange(internalNumValue + value);
			}
		},
		[onChange, internalValue]
	);

	const stepUp = useCallback(() => step(1), [step]);
	const stepDown = useCallback(() => step(-1), [step]);

	const onKeyDown = useCallback(
		(event: any) => {
			if (event.keyCode === Keys.ENTER) {
				onConfirm();
			} else if (event.keyCode === Keys.ARROW_DOWN) {
				stepDown();
			} else if (event.keyCode === Keys.ARROW_UP) {
				stepUp();
			}

			onKeyDownProps?.(event);
		},
		[onConfirm, onKeyDownProps, stepDown, stepUp]
	);

	const onBlur = useCallback(
		(event: any) => {
			onConfirm();
			onBlurProps?.(event);
		},
		[onConfirm, onBlurProps]
	);

	const handleChange = useCallback(
		(event: any) => {
			setInternalValue(event.target.value);

			const numValue = parseFloat(event.target.value);

			if (!isNaN(numValue)) {
				onChange(numValue);
			}
		},
		[onChange]
	);

	return (
		<FormGroup label={label} labelFor={id}>
			<StyledInput
				value={internalValue}
				onChange={handleChange}
				onKeyDown={onKeyDown}
				onBlur={onBlur}
				fill
				id={id}
				className={Classes.NUMERIC_INPUT}
				rightElement={
					<ButtonGroup vertical>
						<Button
							variant={theme.input.numeric.incrementButtons}
							onClick={stepUp}
							icon="chevron-up"
						/>
						<Button
							variant={theme.input.numeric.incrementButtons}
							onClick={stepDown}
							icon="chevron-down"
						/>
					</ButtonGroup>
				}
				{...rest}
			/>
		</FormGroup>
	);
};
