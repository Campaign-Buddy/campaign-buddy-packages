import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Switch as SwitchCore } from '@blueprintjs/core';
import { defaultTheme } from '../theme';
import { BaseInputProps } from '../BaseInputProps';

const StyledSwitch = styled(SwitchCore)`
	color: ${({ theme }) => theme.colors.text};

	&.bp3-control.bp3-switch input:checked ~ .bp3-control-indicator {
		background-color: ${({ theme }) => theme.colors.primary};
	}

	&.bp3-control.bp3-switch:hover input:checked ~ .bp3-control-indicator {
		background-color: ${({ theme }) => theme.colors.primaryHover};
	}
`;

StyledSwitch.defaultProps = {
	theme: defaultTheme,
};

type SwitchProps = BaseInputProps<boolean>;

export const Switch: React.FC<SwitchProps> = ({ value, onChange, label, ...rest }) => {
	const handleChange = useCallback((event) => onChange(event.target.checked), [onChange]);

	return (
		<StyledSwitch
			checked={value}
			onChange={handleChange}
			label={label}
			{...rest}
		/>
	)
}
