import React from 'react';

export interface CoreInputProps<T> {
	value: T;
	onChange: (value: T) => void;
	label?: React.ReactNode;
}

export type BaseInputProps<
	T,
	TInputType extends keyof JSX.IntrinsicElements = 'input'
> = CoreInputProps<T> &
	Omit<
		React.ComponentProps<TInputType>,
		'defaultValue' | 'ref' | 'value' | 'onChange'
	>;
