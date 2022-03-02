import { AggregationSupport } from '@campaign-buddy/form-generator';
import { FieldSettings } from '@campaign-buddy/frontend-types';
import { FormGroup, Button, MenuPopover, Icon } from '@campaign-buddy/core-ui';
import React, { useMemo } from 'react';
import { useBooleanState } from '@campaign-buddy/common-hooks';
import {
	ConfigurableAggregation,
	useAggregationSettingOptions,
} from './useAggregationSettingOptions';
import { useVisibilitySettingOptions } from './useVisibilitySettingOptions';

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
	const [isSettingsMenuOpen, openSettingsMenu, closeSettingsMenu] =
		useBooleanState();

	const { items: aggregationSettingOptions, hasAggregations } =
		useAggregationSettingOptions(
			configurableAggregations,
			fieldSettings,
			aggregationSupport,
			updateFieldSettings
		);

	const visibilitySettingOptions = useVisibilitySettingOptions(
		fieldSettings,
		updateFieldSettings
	);

	const menuItems = useMemo(
		() => [...aggregationSettingOptions, ...visibilitySettingOptions],
		[aggregationSettingOptions, visibilitySettingOptions]
	);

	const labelElements = [<span key="label-text">{label}</span>];

	if (hasAggregations) {
		labelElements.push(<Icon icon="predictive-analysis" />);
	}

	if (menuItems.length > 0) {
		labelElements.push(
			<MenuPopover
				items={menuItems}
				onClose={closeSettingsMenu}
				isOpen={isSettingsMenuOpen}
			>
				<Button
					key="settings-button"
					onClick={openSettingsMenu}
					icon="settings"
					style="minimal"
					size="small"
				/>
			</MenuPopover>
		);
	}

	return <FormGroup label={<>{labelElements}</>}>{children}</FormGroup>;
};
