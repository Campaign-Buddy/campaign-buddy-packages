import React, { useCallback } from 'react';
import styled from 'styled-components';
import { InputGroup } from '@blueprintjs/core';
import { FormGroup } from '../form-group';
import { defaultTheme } from '../theme';
import { useHtmlId } from '../hooks';
import { BaseInputProps } from '../BaseInputProps';

const StyledInputGroup = styled(InputGroup)`
  input {
    background-color: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};
  }
`;

StyledInputGroup.defaultProps = {
	theme: defaultTheme,
};

interface InputProps extends BaseInputProps<string> {
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
	value,
	onChange,
	label,
	id: idProp,
	...rest
}) => {
	const handleOnChange = useCallback(
		(event) => {
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
				{...rest}
			/>
		</FormGroup>
	);
};
