import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Switch as SwitchCore } from '@blueprintjs/core';
import { defaultTheme } from '../theme';
import { BaseInputProps } from '../BaseInputProps';

const StyledSwitch = styled(SwitchCore)`
	color: ${({ theme }) => theme.legacyCoreUi.colors.text};
	margin-bottom: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: 2px 2px 2px 40px !important;

	&.bp3-control.bp3-switch input:checked ~ .bp3-control-indicator {
		background-color: ${({ theme }) =>
			theme.legacyCoreUi.colors.primary} !important;
	}

	&.bp3-control.bp3-switch:hover input:checked ~ .bp3-control-indicator {
		background-color: ${({ theme }) =>
			theme.legacyCoreUi.colors.primaryHover} !important;
	}
`;

StyledSwitch.defaultProps = {
	theme: defaultTheme,
};

interface SwitchProps extends Omit<BaseInputProps<boolean>, 'label'> {
	label?: string;
}

export const Switch: React.FC<React.PropsWithChildren<SwitchProps>> = ({
	value,
	onChange,
	label,
	...rest
}) => {
	const handleChange = useCallback(
		(event: any) => onChange(event.target.checked),
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
