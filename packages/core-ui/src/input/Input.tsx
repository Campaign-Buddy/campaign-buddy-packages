import React, { useCallback } from 'react';
import styled from 'styled-components';
import { InputGroup } from '@blueprintjs/core';
import { FormGroup } from '../form-group';
import { defaultTheme } from '../theme';
import { useHtmlId } from '../hooks';

const StyledInputGroup = styled(InputGroup)`
	input {
		background-color: ${({ theme }) => theme.colors.inputBackground};
		color: ${({ theme }) => theme.colors.text};
	}
`;

StyledInputGroup.defaultProps = {
	theme: defaultTheme,
};

interface InputProps {
	value: string;
	onChange: (value: string) => void;
	label: string;
	placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
	value,
	onChange,
	label,
}) => {
	const handleOnChange = useCallback((event) => {
		onChange(event.target.value);
	}, [onChange]);
	const id = useHtmlId();

	return (
		<FormGroup
			label={label}
			labelFor={id}
		>
			<StyledInputGroup
				value={value}
				onChange={handleOnChange}
				id={id}
			/>
		</FormGroup>
	)
}
