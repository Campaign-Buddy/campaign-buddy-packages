import React, { useCallback, useState } from 'react';
import { Button } from '@campaign-buddy/core-ui';
import { Media } from '@campaign-buddy/frontend-types';
import { QueryClient } from 'react-query';
import { useBooleanState } from '@campaign-buddy/common-hooks';
import { ExistingImagePopover } from '../src';
import { MockMediaApi } from './mockMediaApi';

export default {
	title: 'existing-image-popover/ExistingImagePopover',
	component: ExistingImagePopover,
};

const mediaApi = new MockMediaApi();
const queryClient = new QueryClient();
export const Primary = () => {
	const [isPopoverOpen, openPopover, closePopover] = useBooleanState();
	const [selectedMedia, setSelectedMedia] = useState<Media>();

	const handleConfirm = useCallback(
		(value: Media) => {
			closePopover();
			setSelectedMedia(value);
		},
		[closePopover]
	);

	return (
		<div>
			<ExistingImagePopover
				isOpen={isPopoverOpen}
				onClose={closePopover}
				onConfirm={handleConfirm}
				mediaApi={mediaApi}
				queryClient={queryClient}
			>
				<Button onClick={openPopover}>Pick an image</Button>
			</ExistingImagePopover>
			<p>Your selected image</p>
			{selectedMedia?.url && <img src={selectedMedia.url} />}
		</div>
	);
};
