import React from 'react';
import { CampaignBuddyIcon, Button } from '@campaign-buddy/core-ui';
import {
	ToolbarOrientation,
	useToolbarOrientation,
} from './useToolbarOrientation';

export interface ToolbarButtonProps {
	text: string;
	icon?: CampaignBuddyIcon;
	showText?: 'always' | `${ToolbarOrientation}-only`;
	onClick: () => void;
}

export function ToolbarButton({
	text,
	icon,
	onClick,
	showText = 'always',
}: ToolbarButtonProps) {
	const orientation = useToolbarOrientation();
	const showTextOrientation = /(\w+)-only/.exec(showText)?.[1];

	const shouldShowText =
		showText === 'always' || (showTextOrientation === orientation && icon);

	return (
		<Button icon={icon} onClick={onClick} variant="minimal">
			{shouldShowText && text}
		</Button>
	);
}
