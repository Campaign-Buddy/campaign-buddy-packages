import React, { useCallback } from 'react';
import styled from 'styled-components';
import { TextArea as TextAreaCore } from '@blueprintjs/core';
import { FormGroup } from '../form-group';
import { defaultTheme } from '../theme';
import { useHtmlId } from '../hooks';

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
	label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ value, onChange, label }) => {
	const handleOnChange = useCallback((event) => onChange(event.target.value), [onChange]);
	const id = useHtmlId();
	return (
		<FormGroup
			label={label}
			labelFor={id}
		>
			<StyledTextArea
				value={value}
				onChange={handleOnChange}
				fill
				id={id}
			/>
		</FormGroup>
	);
}
