import React, { useCallback } from 'react';
import { IconName } from '@blueprintjs/icons';
import { StyledToggleButton } from './Button.styled';

interface ToggleButtonProps {
	value: boolean;
	onChange: (value: boolean) => void;
	icon: IconName;
	tooltip?: string;
	size?: 'small' | 'normal' | 'large';
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
	value,
	onChange,
	icon,
	size,
}) => {
	const handleToggle = useCallback(() => {
		onChange(!value);
	}, [onChange, value]);

	return (
		<StyledToggleButton
			icon={icon}
			onClick={handleToggle}
			minimal
			large={size === 'large'}
			small={size === 'small'}
			_style="minimal"
			isActive={value}
		/>
	);
};
