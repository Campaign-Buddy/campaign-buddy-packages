import { Tooltip2 as TooltipCore } from '@blueprintjs/popover2';
import React from 'react';

export interface TooltipProps {
	text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => (
	<TooltipCore content={text}>{children}</TooltipCore>
);
