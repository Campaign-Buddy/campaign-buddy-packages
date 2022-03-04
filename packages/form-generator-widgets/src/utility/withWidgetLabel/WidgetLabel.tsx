import { AggregationSupport } from '@campaign-buddy/form-generator';
import { FieldSettings } from '@campaign-buddy/frontend-types';
import { Button, MenuPopover, Icon } from '@campaign-buddy/core-ui';
import React, { useCallback, useMemo } from 'react';
import { useBooleanState } from '@campaign-buddy/common-hooks';
import {
	ConfigurableAggregation,
	useAggregationSettingOptions,
} from './useAggregationSettingOptions';
import { useVisibilitySettingOptions } from './useVisibilitySettingOptions';
import styled from 'styled-components';

const LabelContainer = styled.span<{ isMenuOpen: boolean }>`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	max-width: 100%;

	& .bp3-popover2-target {
		margin: 0 !important;

		opacity: ${({ isMenuOpen }) => (isMenuOpen ? 1 : 0)};
		transition: opacity 0.2s;
	}

	.bp3-label:hover & .bp3-popover2-target {
		opacity: 1;
	}
`;

const LabelText = styled.span`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

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

	const eatClicks = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleOpenSettingsMenu = useCallback(() => {
		openSettingsMenu();
	}, [openSettingsMenu]);

	const labelElements = [<LabelText key="label-text">{label}</LabelText>];

	if (hasAggregations) {
		labelElements.push(
			<Icon key="aggregation-indicator" icon="predictive-analysis" />
		);
	}

	if (menuItems.length > 0) {
		labelElements.push(
			<span onClick={eatClicks}>
				<MenuPopover
					items={menuItems}
					onClose={closeSettingsMenu}
					isOpen={isSettingsMenuOpen}
					key="settings-menu"
				>
					<Button
						key="settings-button"
						onClick={handleOpenSettingsMenu}
						icon="settings"
						style="minimal"
						size="small"
					/>
				</MenuPopover>
			</span>
		);
	}

	return (
		<LabelContainer isMenuOpen={isSettingsMenuOpen}>
			{labelElements}
		</LabelContainer>
	);
};
