import React, { useCallback } from 'react';
import { IconName } from '@blueprintjs/icons';
import { StyledToggleButton } from './Button.styled';

interface ToggleButtonProps {
	value: boolean;
	onChange: (value: boolean) => void;
	icon: IconName;
	tooltip?: string;
	size?: 'small' | 'normal' | 'large';
	preventFocus?: boolean;
	tabIndex?: number;
}

export const ToggleButton: React.FC<
	React.PropsWithChildren<ToggleButtonProps>
> = ({ value, onChange, icon, size, preventFocus, tabIndex }) => {
	const handleToggle = useCallback(() => {
		onChange(!value);
	}, [onChange, value]);

	const preventFocusHandleToggle = useCallback(
		(e: any) => {
			e.preventDefault();
			onChange(!value);
		},
		[onChange, value]
	);

	return (
		<StyledToggleButton
			icon={icon}
			onClick={preventFocus ? undefined : handleToggle}
			onMouseDown={preventFocus ? preventFocusHandleToggle : undefined}
			minimal
			large={size === 'large'}
			small={size === 'small'}
			_style="minimal"
			isActive={value}
			tabIndex={tabIndex}
		/>
	);
};
