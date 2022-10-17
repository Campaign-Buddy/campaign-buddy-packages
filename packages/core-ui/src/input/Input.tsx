import React, { useCallback } from 'react';
import styled from 'styled-components';
import { InputGroup } from '@blueprintjs/core';
import { FormGroup } from '../form-group';
import { defaultTheme } from '../theme';
import { useHtmlId } from '../hooks';
import { BaseInputProps } from '../BaseInputProps';
import { baseInputStyles } from './Input.styled';

const StyledInputGroup = styled(InputGroup)`
	input {
		${baseInputStyles}
	}
`;

StyledInputGroup.defaultProps = {
	theme: defaultTheme,
};

export interface InputProps extends BaseInputProps<string> {
	placeholder?: string;
	rightElement?: JSX.Element;
}

export const Input: React.FC<React.PropsWithChildren<InputProps>> = ({
	value,
	onChange,
	label,
	id: idProp,
	rightElement,
	...rest
}) => {
	const handleOnChange = useCallback(
		(event: any) => {
			onChange(event.target.value);
		},
		[onChange]
	);
	const generatedId = useHtmlId();
	const id = idProp ?? generatedId;

	return (
		<FormGroup label={label} labelFor={id}>
			<StyledInputGroup
				value={value}
				onChange={handleOnChange}
				id={id}
				rightElement={rightElement}
				{...rest}
			/>
		</FormGroup>
	);
};
