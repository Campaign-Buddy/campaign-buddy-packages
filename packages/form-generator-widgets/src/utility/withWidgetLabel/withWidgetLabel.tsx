import { WidgetProps } from '@campaign-buddy/form-generator';
import React from 'react';
import { CBWidgetProps } from '../../CBWidgetProps';
import { ConfigurableAggregation } from './useAggregationSettingOptions';
import { WidgetLabel } from './WidgetLabel';

export function withWidgetLabel<T>(
	Component: React.FC<CBWidgetProps<T, any>>,
	configurableAggregations?: ConfigurableAggregation[]
): React.FC<WidgetProps<T>> {
	const WithWidgetLabel: React.FC<WidgetProps<T>> = ({
		label: rawLabel,
		...props
	}) => {
		const label = (
			<WidgetLabel
				label={rawLabel}
				aggregationSupport={props.aggregationSupport}
				configurableAggregations={configurableAggregations}
				fieldSettings={props.fieldSettings}
				updateFieldSettings={props.updateFieldSettings}
			/>
		);

		return <Component {...props} label={label} />;
	};

	return WithWidgetLabel;
}
