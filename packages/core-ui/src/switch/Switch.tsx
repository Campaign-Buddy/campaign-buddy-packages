import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Switch as SwitchCore } from '@blueprintjs/core';
import { defaultTheme } from '../theme';
import { BaseInputProps } from '../BaseInputProps';

const StyledSwitch = styled(SwitchCore)`
	color: ${({ theme }) => theme.colors.text};
	margin-bottom: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: 2px 2px 2px 40px !important;

	&.bp3-control.bp3-switch input:checked ~ .bp3-control-indicator {
		background-color: ${({ theme }) => theme.colors.primary} !important;
	}

	&.bp3-control.bp3-switch:hover input:checked ~ .bp3-control-indicator {
		background-color: ${({ theme }) => theme.colors.primaryHover} !important;
	}
`;

StyledSwitch.defaultProps = {
	theme: defaultTheme,
};

type SwitchProps = BaseInputProps<boolean>;

export const Switch: React.FC<SwitchProps> = ({
	value,
	onChange,
	label,
	...rest
}) => {
	const handleChange = useCallback(
		(event) => onChange(event.target.checked),
		[onChange]
	);

	return (
		<StyledSwitch
			checked={value}
			onChange={handleChange}
			label={label}
			{...rest}
		/>
	);
};
