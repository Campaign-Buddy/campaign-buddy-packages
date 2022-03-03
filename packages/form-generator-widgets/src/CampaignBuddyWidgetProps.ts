import { WidgetProps } from '@campaign-buddy/form-generator';
import React from 'react';

export interface CampaignBuddyWidgetProps<TValue, TAggregates>
	extends Omit<WidgetProps<TValue, TAggregates>, 'label'> {
	label: React.ReactNode;
}
