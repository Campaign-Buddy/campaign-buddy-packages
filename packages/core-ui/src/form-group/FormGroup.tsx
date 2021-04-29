import React from 'react';
import styled from 'styled-components';
import { FormGroup as FormGroupCore } from '@blueprintjs/core';
import { defaultTheme } from '../theme';

const StyledFormGroup = styled(FormGroupCore)`
	label {
		color: ${({ theme }) => theme.colors.text};
	}
`;

StyledFormGroup.defaultProps = {
	theme: defaultTheme,
};

export { FormGroupCore as FormGroup };
