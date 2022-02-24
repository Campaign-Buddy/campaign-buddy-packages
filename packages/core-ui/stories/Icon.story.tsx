import React from 'react';
import { Icon } from '../src';

export default {
	title: 'core-ui/Icon',
	component: Icon,
};

export const Primary = () => {
	return <Icon icon="predictive-analysis" />;
};

export const CustomSize = () => {
	return <Icon icon="airplane" size={32} />;
};
