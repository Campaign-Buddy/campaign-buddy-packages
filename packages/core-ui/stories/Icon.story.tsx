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

export const Image = () => {
	return (
		<Icon
			icon={{
				kind: 'image',
				src: 'https://i.picsum.photos/id/469/75/100.jpg?hmac=vkSFpatBlwe70VN4SSaJjgFNb9UiOXy0FUEnd_FIaSE',
			}}
			size={24}
		/>
	);
};
