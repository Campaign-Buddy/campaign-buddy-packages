import React from 'react';
import { MarkToggle } from './MarkToggle';

export const Toolbar: React.FC = () => {
	return (
		<>
			<MarkToggle icon="bold" format="isBold" />
			<MarkToggle icon="italic" format="isItalic" />
			<MarkToggle icon="underline" format="isUnderline" />
		</>
	);
};
