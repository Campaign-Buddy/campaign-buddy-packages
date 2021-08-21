import React from 'react';

interface InputProps<T> {
	value: T;
	onChange: (value: T) => void;
	label: string;
}

export type BaseInputProps<T, TInputType extends keyof JSX.IntrinsicElements = 'input'> =
	InputProps<T> &
	Omit<React.ComponentProps<TInputType>, 'defaultValue' | 'ref' | 'value' | 'onChange'>;
