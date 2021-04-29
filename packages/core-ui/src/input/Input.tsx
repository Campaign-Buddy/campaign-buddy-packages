import React, { useCallback } from 'react';
import styled from 'styled-components';
import { InputGroup } from '@blueprintjs/core';
import { defaultTheme } from '../theme';

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
}

export const Input: React.FC<InputProps> = ({
	value,
	onChange,
}) => {
	const handleOnChange = useCallback((event) => {
		onChange(event.target.value);
	}, [onChange]);

	return (
		<StyledInputGroup
			value={value}
			onChange={handleOnChange}
		/>
	)
}
