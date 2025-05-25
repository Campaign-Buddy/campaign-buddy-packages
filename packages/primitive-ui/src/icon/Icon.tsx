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

const iconModules = import.meta.glob('./react-icons/*.(js|ts)');

function useLazyIcon(reactIconPath: string) {
	const [loadedIcon, setLoadedIcon] =
		useState<React.ComponentType<IconBaseProps> | null>(null);

	useEffect(() => {
		if (!reactIconPath) {
			return;
		}

		let canceled = false;

		const [group, iconName] = reactIconPath.split('/');

		const importIconModule = iconModules[`./react-icons/${group}.ts`] ?? iconModules[`./react-icons/${group}.js`];
		if (!importIconModule) {
			return;
		}

		importIconModule().then((iconGroup: any) => {
			if (!canceled) {
				setLoadedIcon(() => iconGroup[iconName]);
			}
		});

		return () => {
			canceled = true;
		};
	}, [reactIconPath]);

	return loadedIcon;
}
