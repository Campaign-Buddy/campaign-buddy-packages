import React, { useCallback } from 'react';
import { Button } from '@campaign-buddy/core-ui';
import { useBooleanState } from '@campaign-buddy/common-hooks';
import { Media } from '@campaign-buddy/frontend-types';
import { QueryClient } from 'react-query';
import { ImagePickerMenu } from '../src';
import { MockMediaApi } from './mockMediaApi';

export default {
	title: 'image-picker-menu/ImagePickerMenu',
	component: ImagePickerMenu,
};

const queryClient = new QueryClient();
const mediaApi = new MockMediaApi();

export const Primary = () => {
	const [isOpen, open, close] = useBooleanState();
	const onConfirm = useCallback(
		(url: string, media?: Media) => {
			close();
			console.log(url, media);
		},
		[close]
	);

	const observeStateChange = useCallback((oldState, currentState) => {
		console.log(`State change: ${oldState} -> ${currentState}`);
	}, []);

	return (
		<ImagePickerMenu
			isOpen={isOpen}
			onClose={close}
			onConfirm={onConfirm}
			mediaApi={mediaApi}
			queryClient={queryClient}
			onStateTransition={observeStateChange}
		>
			<Button onClick={open}>Pick Image</Button>
		</ImagePickerMenu>
	);
};
