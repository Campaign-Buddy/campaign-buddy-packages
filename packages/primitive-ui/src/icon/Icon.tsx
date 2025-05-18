import React, { useEffect, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { IconName, iconNames } from './iconNames';
import { IconContainer } from './styled';

export interface IconProps {
	name: IconName;
	size: number;
}

export function Icon({ name, size }: IconProps) {
	const IconComponent = useLazyIcon(iconNames[name]);

	return (
		<IconContainer size={size}>
			{IconComponent && <IconComponent size={size} />}
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

		import(`react-icons/${group}`).then((fontGroup) => {
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
