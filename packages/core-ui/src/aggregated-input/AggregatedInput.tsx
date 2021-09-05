import React, { useCallback, useRef, useState } from 'react';
import { Icon } from '@blueprintjs/core';
import { BaseInputProps } from '../BaseInputProps';
import { FormGroup } from '../form-group';
import { Popover } from '../popover';
import { Tooltip2 } from '@blueprintjs/popover2';
import { Button } from '../button';
import {
	AggregatedDisplayText,
	PopoverContentRoot,
	AggregationPreviewText,
	DisplayValueContainer,
} from './AggregatedInput.styled';

interface AggregatedInputPropsCore<T, TInputType extends keyof JSX.IntrinsicElements> {
	InputComponent: React.FC<BaseInputProps<T, TInputType>>;

	baseValueLabel?: string;

	/**
	 * The aggregated value that gets displayed
	 * to the user
	 */
	aggregatedDisplayValue: string;

	/**
	 * For the help tooltip of the popover to show
	 * what went into this aggregation
	 */
	aggregationDescription?: string;
}

export type AggregatedInputProps<T, TInputType extends keyof JSX.IntrinsicElements> =
	AggregatedInputPropsCore<T, any> &
	BaseInputProps<T, TInputType>;

export const AggregatedInput = <T extends any, TInputType extends keyof JSX.IntrinsicElements>({
	aggregatedDisplayValue,
	aggregationDescription,
	baseValueLabel,
	InputComponent,
	value,
	onChange,
	label,
	className,
	...rest
}: AggregatedInputProps<T, TInputType>) => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const popoverContentRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const closePopover = useCallback(() => {
		setIsPopoverOpen(false);
		buttonRef.current?.focus();
	}, []);
	const openPopover = useCallback(() => setIsPopoverOpen(true), []);

	const helpTooltip = aggregationDescription ? (
		<Tooltip2 content={aggregationDescription}>
			<Icon icon="help" iconSize={10} />
		</Tooltip2>
	) : null;

	const PopoverContent = (
		<PopoverContentRoot ref={popoverContentRef}>
			<div tabIndex={0} onFocus={closePopover} />
			<InputComponent
				value={value}
				onChange={onChange}
				label={baseValueLabel}
				autoFocus
				{...rest}
			/>
			<AggregationPreviewText>
				Computed{helpTooltip} = {aggregatedDisplayValue}
			</AggregationPreviewText>
			<div tabIndex={0} onFocus={closePopover} />
		</PopoverContentRoot>
	);

	return (
		<FormGroup label={label} className={className} onClick={openPopover}>
			<DisplayValueContainer>
				<Popover
					isOpen={isPopoverOpen}
					onClose={closePopover}
					content={PopoverContent}
				>
					<AggregatedDisplayText onClick={openPopover}>
						{aggregatedDisplayValue}
					</AggregatedDisplayText>
				</Popover>
				<Button
					icon="edit"
					onClick={openPopover}
					style="minimal"
					buttonRef={buttonRef}
					size="small"
				/>
			</DisplayValueContainer>
		</FormGroup>
	);
};
