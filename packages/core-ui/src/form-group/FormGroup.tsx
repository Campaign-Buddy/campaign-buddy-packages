import styled from 'styled-components';
import { FormGroup as FormGroupCore } from '@blueprintjs/core';
import { defaultTheme } from '../theme';
import React from 'react';

const StyledFormGroup = styled(FormGroupCore)`
	label {
		color: ${({ theme }) => theme.colors.text};
	}
`;

StyledFormGroup.defaultProps = {
	theme: defaultTheme,
};

interface FormGroupProps {
	label?: string;
	labelFor?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
	label,
	labelFor,
	children
}) => (
	<FormGroupCore label={label} labelFor={labelFor}>
		{children}
	</FormGroupCore>
);
