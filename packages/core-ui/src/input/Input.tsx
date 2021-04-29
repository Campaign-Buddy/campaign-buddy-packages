import React, { useCallback } from 'react';
import { InputGroup } from '@blueprintjs/core';

interface InputProps {
	value: string;
	onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
	value,
	onChange,
}) => {
	const handleOnChange = useCallback((event) => {
		onChange(event.target.value);
	}, [onChange]);

	return (
		<InputGroup
			value={value}
			onChange={handleOnChange}
		/>
	)
}
