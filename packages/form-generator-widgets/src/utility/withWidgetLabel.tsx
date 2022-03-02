import { WidgetProps } from '@campaign-buddy/form-generator';
import React from 'react';
import { ConfigurableAggregation, WidgetLabel } from './widgetLabel';

export function withWidgetLabel<T>(
	Component: React.FC<WidgetProps<T>>,
	configurableAggregations?: ConfigurableAggregation[]
): React.FC<WidgetProps<T>> {
	const WithWidgetLabel: React.FC<WidgetProps<T>> = (props) => {
		return (
			<WidgetLabel
				label={props.label}
				aggregationSupport={props.aggregationSupport}
				configurableAggregations={configurableAggregations}
				fieldSettings={props.fieldSettings}
				updateFieldSettings={props.updateFieldSettings}
			>
				<Component {...props} />
			</WidgetLabel>
		);
	};

	return WithWidgetLabel;
}
