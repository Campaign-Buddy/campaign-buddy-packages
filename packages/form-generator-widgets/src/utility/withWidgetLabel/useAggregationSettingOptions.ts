import { MenuItem } from '@campaign-buddy/core-ui';
import { AggregationSupport } from '@campaign-buddy/form-generator';
import {
	FieldSettings,
	AggregationSetting,
} from '@campaign-buddy/frontend-types';
import cloneDeep from 'lodash.clonedeep';
import { useMemo } from 'react';
import { useAvailableActions } from '../../FormWidgetProvider';

export interface ConfigurableAggregation {
	label?: string;
	path: string;
}

export function useAggregationSettingOptions(
	configurableAggregations: ConfigurableAggregation[] | undefined,
	fieldSettings: FieldSettings<any> | undefined,
	aggregationSupport: AggregationSupport<any>,
	updateFieldSettings: ((fieldSettings: FieldSettings<any>) => void) | undefined
): { items: MenuItem[]; hasAggregations: boolean } {
	const menuItems = useMemo(
		() =>
			updateFieldSettings &&
			getAggregationSettingOptions(
				configurableAggregations,
				fieldSettings ?? {},
				'Compute this field?',
				aggregationSupport,
				updateFieldSettings
			),
		[
			aggregationSupport,
			configurableAggregations,
			fieldSettings,
			updateFieldSettings,
		]
	);

	const availableActions = useAvailableActions();

	const hasAggregations = useMemo(() => {
		return supportsAnyAggregations(aggregationSupport);
	}, [aggregationSupport]);

	const items = useMemo(() => {
		if (
			!menuItems ||
			!hasAggregations ||
			!availableActions.canUpdateAggregationSettings
		) {
			return [];
		}

		if (menuItems.length === 1) {
			return menuItems;
		}

		return [
			{
				displayText: 'Computed property settings',
				icon: 'predictive-analysis',
				subItems: menuItems,
			},
		] as MenuItem[];
	}, [
		availableActions.canUpdateAggregationSettings,
		hasAggregations,
		menuItems,
	]);

	return {
		items,
		hasAggregations,
	};
}

function getAggregationSettingOptions(
	configurableAggregations: ConfigurableAggregation[] | undefined,
	fieldSettings: FieldSettings<any>,
	defaultLabel: string,
	aggregationSupport: AggregationSupport<any>,
	updateFieldSettings: (fieldSettings: FieldSettings<any>) => void
): MenuItem[] {
	const defaultAggregationSupport =
		typeof aggregationSupport === 'boolean' ? true : {};

	if (!configurableAggregations || configurableAggregations.length === 0) {
		if (!fieldSupportsAggregation('$', aggregationSupport)) {
			return [];
		}

		return [
			getAggregationSettingItem(
				{
					path: '$',
					label: defaultLabel,
				},
				fieldSettings.aggregationSettings ?? defaultAggregationSupport,
				(aggregationSettings) =>
					updateFieldSettings({
						...fieldSettings,
						aggregationSettings,
					})
			),
		];
	}

	return configurableAggregations
		.filter((item) => fieldSupportsAggregation(item.path, aggregationSupport))
		.map((itemSetting) =>
			getAggregationSettingItem(
				itemSetting,
				fieldSettings.aggregationSettings ?? defaultAggregationSupport,
				(aggregationSettings) =>
					updateFieldSettings({
						...fieldSettings,
						aggregationSettings,
					})
			)
		);
}

function getAggregationSettingItem(
	itemSettings: ConfigurableAggregation,
	currentAggregationSettings: AggregationSetting<any>,
	updateAggregationSettings: (
		aggregationSettings: AggregationSetting<any>
	) => void
): MenuItem {
	const currentValue = getAggregationSettingAtPath(
		itemSettings.path,
		currentAggregationSettings
	);

	const icon = currentValue ? 'tick' : 'blank';

	return {
		displayText: itemSettings.label,
		icon,
		onClick: () => {
			const copy = cloneDeep(currentAggregationSettings);
			const updatedCopy = updateAggregationSettingAtPath(
				itemSettings.path,
				copy,
				!currentValue
			);
			updateAggregationSettings(updatedCopy);
		},
	};
}

function updateAggregationSettingAtPath(
	path: string,
	mutableSettings: AggregationSetting<any>,
	value: boolean
): AggregationSetting<any> {
	if (path.trim() === '$' || path.trim() === '') {
		return value;
	}

	const pathParts = path.split('.');
	let cur = mutableSettings as any;
	let nextPart: string = pathParts[0];

	for (let i = 0; i < pathParts.length - 1; i++) {
		const curPart = pathParts[i];
		nextPart = pathParts[i + 1];

		if (curPart === '$') {
			continue;
		}

		if (typeof cur[curPart] !== 'object') {
			cur[curPart] = {};
		}

		cur = cur[curPart];
	}

	cur[nextPart] = value;
	return cur;
}

function fieldSupportsAggregation(
	path: string,
	aggregationSupport: AggregationSupport<any>
): boolean {
	if (aggregationSupport === true) {
		return true;
	}

	if (aggregationSupport === false) {
		return false;
	}

	return getAggregationSettingAtPath(path, aggregationSupport, false);
}

function getAggregationSettingAtPath(
	path: string,
	currentAggregationSettings: any,
	defaultValue = true
) {
	const pathParts = path.split('.');
	let cur = currentAggregationSettings as any;

	for (let i = 0; i < pathParts.length; i++) {
		if (cur === true) {
			return true;
		}

		if (cur === false) {
			return false;
		}

		const curPart = pathParts[i];

		if (curPart === '$' && i === 0) {
			continue;
		}

		if (typeof cur[curPart] === 'boolean') {
			return cur[curPart];
		}

		if (!cur[curPart]) {
			return defaultValue;
		}

		cur = cur[curPart];
	}

	return cur ?? defaultValue;
}

function supportsAnyAggregations(
	aggregationSupport: AggregationSupport<any>
): boolean {
	if (aggregationSupport === true) {
		return true;
	}

	if (aggregationSupport === false) {
		return false;
	}

	if (typeof aggregationSupport === 'object') {
		return Object.values(aggregationSupport).some((x) =>
			supportsAnyAggregations(x)
		);
	}

	return false;
}
