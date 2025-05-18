import React from 'react';
import { Icon } from '../src';
import { SizeStep } from '@campaign-buddy/themes';
import { IconName, iconNames } from '../src/icon/iconNames';

export function iconElementControl(size: SizeStep) {
	const mapping: Record<string, React.ReactNode> = Object.fromEntries(
		Object.keys(iconNames).map((iconName) => [
			iconName,
			<Icon name={iconName as IconName} size={size} key={iconName} />,
		])
	);

	mapping['none'] = undefined;

	const labels = Object.fromEntries(
		Object.keys(iconNames).map((iconName) => [iconName, iconName])
	);

	labels['none'] = 'none';

	console.log(mapping);

	return {
		options: ['none', ...Object.keys(iconNames)],
		mapping,
		control: {
			type: 'select',
			labels,
		},
	};
}
