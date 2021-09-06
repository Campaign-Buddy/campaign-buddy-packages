import React from 'react';
import { AggregatedInput, AggregatedInputProps } from './AggregatedInput';
import { NumberInput, Input, TextArea } from '../input';

type DerivedAggregatedInputProps<T, TInputType extends keyof JSX.IntrinsicElements> = Omit<AggregatedInputProps<T, TInputType>, 'InputComponent'>;

export const AggregatedNumberInput: React.FC<DerivedAggregatedInputProps<number, 'input'>> = (props) => (
	<AggregatedInput {...props} InputComponent={NumberInput} />
);

export const AggregatedTextInput: React.FC<DerivedAggregatedInputProps<string, 'input'>> = (props) => (
	<AggregatedInput {...props} InputComponent={Input} />
);

export const AggregatedTextArea: React.FC<DerivedAggregatedInputProps<string, 'textarea'>> = (props) => (
	<AggregatedInput {...props} InputComponent={TextArea} />
);
