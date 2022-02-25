import { AggregationSupport } from '@campaign-buddy/form-generator/src/AggregationSupport';
import {
	AggregationSetting,
	FieldSettings,
} from '@campaign-buddy/frontend-types';
import cloneDeep = require('lodash.clonedeep');
import { MenuItem, FormGroup, Button, MenuPopover, Icon } from '@campaign-buddy/core-ui';
import React, { useMemo } from 'react';
import {
	useAvailableActions,
	useVisibilitySettings,
} from '../FormWidgetProvider';
import { useBooleanState } from '@campaign-buddy/common-hooks';

export interface ConfigurableAggregation {
	label?: string;
	path: string;
}

interface WidgetLabelProps {
	label: string;
	/**
	 * For fields that need more fine grain control
	 * over which properties can be aggregated
	 */
	configurableAggregations?: ConfigurableAggregation[];
	aggregationSupport: AggregationSupport<any>;
	fieldSettings: FieldSettings<any> | undefined;
	updateFieldSettings:
		| ((fieldSettings: FieldSettings<any>) => void)
		| undefined;
}

export const WidgetLabel: React.FC<WidgetLabelProps> = ({
	aggregationSupport,
	fieldSettings,
	updateFieldSettings,
	configurableAggregations,
	label,
	children,
}) => {
	const availableActions = useAvailableActions();
	const visibilitySettings = useVisibilitySettings();
	const [isSettingsMenuOpen, openSettingsMenu, closeSettingsMenu] = useBooleanState();

	const hasAggregations = useMemo(() => {
		return supportsAnyAggregations(aggregationSupport);
	}, [aggregationSupport]);

	const menuItems = useMemo(() => {
		if (!updateFieldSettings) {
			return [];
		}

		const items: MenuItem[] = [];

		if (availableActions.canUpdateAggregationSettings && hasAggregations) {
			const aggregationSettingItems = getAggregationSettingItems(
				configurableAggregations,
				fieldSettings ?? {},
				'Compute this field?',
				aggregationSupport,
				updateFieldSettings
			);

			if (aggregationSettingItems.length > 0) {
				if (aggregationSettingItems.length === 1) {
					items.push(...aggregationSettingItems);
				} else {
					items.push({
						displayText: 'Computed property settings',
						icon: 'predictive-analysis',
						subItems: aggregationSettingItems,
					});
				}
			}
		}

		if (
			availableActions.canUpdateVisibilitySettings &&
			visibilitySettings.length
		) {
			const setVisibility = (roles?: string[]) => {
				updateFieldSettings({
					...fieldSettings,
					visibleRoles: roles,
				});
			}

			const isActiveVisibilitySetting = (roles: string[]) => {
				return true;
			}

			items.push({
				displayText: 'Visibility settings',
				icon: 'eye-open',
				subItems: [
					{
						displayText: 'Default visibility settings',
						icon: !fieldSettings?.visibleRoles ? 'tick' : 'blank',
						onClick: () => setVisibility(),
					},
					...visibilitySettings.map<MenuItem>((setting) => ({
						displayText: setting.label,
						icon: isActiveVisibilitySetting(setting.roles) ? 'tick' : 'blank',
						onClick: () => setVisibility(setting.roles),
					}))
				],
			});
		}

		return items;
	}, [
		aggregationSupport,
		availableActions.canUpdateAggregationSettings,
		availableActions.canUpdateVisibilitySettings,
		configurableAggregations,
		fieldSettings,
		updateFieldSettings,
		visibilitySettings.length,
	]);

	let labelElements = [<span key="label-text">{label}</span>];

	if (hasAggregations) {
		labelElements.push(
			<Icon icon="predictive-analysis" />
		)
	}

	if (menuItems.length > 0) {
		labelElements.push(
			<MenuPopover items={menuItems} onClose={closeSettingsMenu} isOpen={isSettingsMenuOpen}>
				<Button
					key="settings-button"
					onClick={openSettingsMenu}
					icon="settings"
					style="minimal"
					size="small"
				/>
			</MenuPopover>
		)
	}

	return (
		<FormGroup label={
			<>
				{labelElements}
			</>
		}>
			{children}
		</FormGroup>
	)
};

function supportsAnyAggregations(aggregationSupport: AggregationSupport<any>): boolean {
	if (aggregationSupport === true) {
		return true;
	}

	if (aggregationSupport === false) {
		return false;
	}

	if (typeof aggregationSupport === 'object') {
		return Object.values(aggregationSupport).some(x => supportsAnyAggregations(x));
	}

	return false;
}

function getAggregationSettingItems(
	configurableAggregations: ConfigurableAggregation[] | undefined,
	fieldSettings: FieldSettings<any>,
	defaultLabel: string,
	aggregationSupport: AggregationSupport<any>,
	updateFieldSettings: (fieldSettings: FieldSettings<any>) => void
): MenuItem[] {
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
				fieldSettings.aggregationSettings ?? true,
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
				fieldSettings.aggregationSettings ?? true,
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
		if (pathParts[i] === '$' && i === 0) {
			continue;
		}

		const curPart = pathParts[i];
		nextPart = pathParts[i + 1];

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
