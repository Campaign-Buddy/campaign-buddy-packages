import React, { useEffect, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { IconName, iconNames } from './iconNames';
import { IconContainer } from './styled';
import { SizeStep } from '@campaign-buddy/themes';
import { useTheme } from '@campaign-buddy/react-theme-provider';

export interface IconProps {
	name: IconName;
	size?: SizeStep;
}

export function Icon({ name, size = 'medium' }: IconProps) {
	const theme = useTheme();
	const IconComponent = useLazyIcon(iconNames[name]);

	return (
		<IconContainer size={theme.sizes.iconSizes[size]}>
			{IconComponent && <IconComponent size={theme.sizes.iconSizes[size]} />}
		</IconContainer>
	);
}

function useLazyIcon(reactIconPath: string) {
	const [loadedIcon, setLoadedIcon] =
		useState<React.ComponentType<IconBaseProps> | null>(null);

	useEffect(() => {
		if (!reactIconPath) {
			return;
		}

		let canceled = false;

		const [group, iconName] = reactIconPath.split('/');

		import(`./react-icons/${group}.ts`).then((fontGroup) => {
			if (!canceled) {
				setLoadedIcon(() => fontGroup[iconName]);
			}
		});

		return () => {
			canceled = true;
		};
	}, [reactIconPath]);

	return loadedIcon;
}
