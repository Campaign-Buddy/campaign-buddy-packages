import styled from 'styled-components';
import { FormGroup as FormGroupCore } from '@blueprintjs/core';
import { defaultTheme } from '../theme';
import React, { useCallback } from 'react';

const StyledFormGroup = styled(FormGroupCore)`
	label.bp3-label {
		color: ${({ theme }) => theme.colors.text};
		font-weight: 500;
	}

	& & {
		margin-bottom: 0;
	}
`;

StyledFormGroup.defaultProps = {
	theme: defaultTheme,
};

interface FormGroupProps {
	label?: React.ReactNode;
	labelFor?: string;
	className?: string;
	onClick?: () => void;
}

export const FormGroup: React.FC<FormGroupProps> = ({
	label,
	labelFor,
	children,
	className,
	onClick,
}) => {
	const handleClick = useCallback(() => onClick?.(), [onClick]);

	return (
		<StyledFormGroup
			label={
				onClick && label ? <span onClick={handleClick}>{label}</span> : label
			}
			labelFor={labelFor ?? ''}
			className={className}
		>
			{children}
		</StyledFormGroup>
	);
};
