import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Button, Input, Popover } from '@campaign-buddy/core-ui';

export interface ExternalUrlPopoverProps {
	onConfirm: (url: string) => void;
	onClose: () => void;
	isOpen: boolean;
}

export const ExternalUrlPopover: React.FC<
	React.PropsWithChildren<ExternalUrlPopoverProps>
> = ({ onConfirm, onClose, isOpen, children }) => {
	const [value, setValue] = useState('');

	useEffect(() => {
		if (isOpen) {
			setValue('');
		}
	}, [isOpen]);

	const isValidUrl = useMemo(() => {
		return /(https?:\/\/)?([a-z][0-9a-z-]{0,254}\.)*([a-z0-9-]{2,255})\.[a-z0-9-]{2,64}/i.test(
			value
		);
	}, [value]);

	const handleSubmit = useCallback(() => {
		if (!isValidUrl) {
			return;
		}

		onConfirm(value);
	}, [onConfirm, value, isValidUrl]);

	return (
		<Popover
			isOpen={isOpen}
			onClose={onClose}
			placement="bottom-start"
			noMargin
			content={
				<Input
					label="External url"
					value={value}
					onChange={setValue}
					onSubmit={handleSubmit}
					rightElement={
						<Button
							variant="minimal"
							size="small"
							icon="small-tick"
							onClick={handleSubmit}
							disabled={!isValidUrl}
						/>
					}
				/>
			}
		>
			{children}
		</Popover>
	);
};
