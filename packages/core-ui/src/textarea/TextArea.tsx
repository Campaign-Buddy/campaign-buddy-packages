import React, { useCallback } from 'react';
import { TextArea as TextAreaCore } from '@blueprintjs/core';

interface TextAreaProps {
	value: string;
	onChange: (value: string) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({ value, onChange }) => {
	const handleOnChange = useCallback((event) => onChange(event.target.value), [onChange]);
	return (
		<TextAreaCore
			value={value}
			onChange={handleOnChange}
			fill
		/>
	);
}
