import React, { useCallback } from 'react';
import styled from 'styled-components';
import { TextArea as TextAreaCore } from '@blueprintjs/core';
import { FormGroup } from '../form-group';
import { defaultTheme } from '../theme';
import { useHtmlId } from '../hooks';
import { BaseInputProps } from '../BaseInputProps';
import { baseInputStyles } from './Input.styled';

const StyledTextArea = styled(TextAreaCore)`
	${baseInputStyles}
	resize: vertical;
	min-height: 75px;
`;

StyledTextArea.defaultProps = {
	theme: defaultTheme,
};

type TextAreaProps = BaseInputProps<string, 'textarea'>;

export const TextArea: React.FC<TextAreaProps> = ({
	value,
	onChange,
	label,
	id: idProp,
	...rest
}) => {
	const handleOnChange = useCallback(
		(event) => onChange(event.target.value),
		[onChange]
	);
	const generatedId = useHtmlId();
	const id = idProp ?? generatedId;

	return (
		<FormGroup label={label} labelFor={id}>
			<StyledTextArea
				value={value}
				onChange={handleOnChange}
				fill
				id={id}
				{...rest}
			/>
		</FormGroup>
	);
};
