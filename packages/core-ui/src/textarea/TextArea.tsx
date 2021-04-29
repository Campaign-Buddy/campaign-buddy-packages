import React, { useCallback } from 'react';
import styled from 'styled-components';
import { TextArea as TextAreaCore } from '@blueprintjs/core';
import { defaultTheme } from '../theme';

const StyledTextArea = styled(TextAreaCore)`
	background-color: ${({ theme }) => theme.colors.inputBackground};
	color: ${({ theme }) => theme.colors.text};
	resize: vertical;
	min-height: 75px;
`;

StyledTextArea.defaultProps = {
	theme: defaultTheme,
}

interface TextAreaProps {
	value: string;
	onChange: (value: string) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({ value, onChange }) => {
	const handleOnChange = useCallback((event) => onChange(event.target.value), [onChange]);
	return (
		<StyledTextArea
			value={value}
			onChange={handleOnChange}
			fill
		/>
	);
}
