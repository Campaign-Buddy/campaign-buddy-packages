import { WidgetProps } from '@campaign-buddy/form-generator';
import React from 'react';
import { CBWidgetProps } from '../../CBWidgetProps';
import { ConfigurableAggregation } from './useAggregationSettingOptions';
import { WidgetLabel } from './WidgetLabel';

export function withWidgetLabel<TValue, TAggregates>(
	Component: React.FC<
		React.PropsWithChildren<CBWidgetProps<TValue, TAggregates>>
	>,
	configurableAggregations?: ConfigurableAggregation[]
): React.FC<React.PropsWithChildren<WidgetProps<TValue>>> {
	const WithWidgetLabel: React.FC<
		React.PropsWithChildren<WidgetProps<TValue>>
	> = ({ label: rawLabel, ...props }) => {
		const label = (
			<WidgetLabel
				label={rawLabel}
				aggregationSupport={props.aggregationSupport}
				configurableAggregations={configurableAggregations}
				fieldSettings={props.fieldSettings}
				updateFieldSettings={props.updateFieldSettings}
			/>
		);

		const TypeFixComponent = Component as any;
		return <TypeFixComponent {...props} label={label} rawLabel={rawLabel} />;
	};

	return WithWidgetLabel;
}
