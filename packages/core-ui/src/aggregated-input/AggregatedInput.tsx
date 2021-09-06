import React, { useCallback, useRef, useState } from 'react';
import { Icon } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import { Variants } from 'framer-motion';
import { BaseInputProps } from '../BaseInputProps';
import { FormGroup } from '../form-group';
import { Popover } from '../popover';
import { Button } from '../button';
import {
	AggregatedDisplayText,
	PopoverContentRoot,
	AggregationPreviewText,
	DisplayValueContainer,
	AnimatedButtonContainer,
} from './AggregatedInput.styled';
import { useBooleanState } from '../hooks';

const editButtonVariants: Variants = {
	hidden: {
		width: 0,
		marginLeft: 0,
		opacity: 0,
	},
	visible: {
		width: 'auto',
		marginLeft: '4px',
		opacity: 1,
	},
};

interface AggregatedInputPropsCore<
	T,
	TInputType extends keyof JSX.IntrinsicElements
> {
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

export type AggregatedInputProps<
	T,
	TInputType extends keyof JSX.IntrinsicElements
> = AggregatedInputPropsCore<T, any> & BaseInputProps<T, TInputType>;

export const AggregatedInput = <
	T extends any,
	TInputType extends keyof JSX.IntrinsicElements
>({
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
	const [isEditButtonFocused, onEditButtonFocus, onEditButtonBlur] =
		useBooleanState();
	const [isHovering, onMouseEnter, onMouseLeave] = useBooleanState();

	const editButtonState =
		(isEditButtonFocused || isHovering) && !isPopoverOpen
			? 'visible'
			: 'hidden';

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
			<DisplayValueContainer
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<Popover
					isOpen={isPopoverOpen}
					onClose={closePopover}
					content={PopoverContent}
				>
					<AggregatedDisplayText onClick={openPopover}>
						{aggregatedDisplayValue}
					</AggregatedDisplayText>
				</Popover>
				<AnimatedButtonContainer
					variants={editButtonVariants}
					initial="unfocused"
					animate={editButtonState}
				>
					<Button
						icon="edit"
						onClick={openPopover}
						onFocus={onEditButtonFocus}
						onBlur={onEditButtonBlur}
						style="minimal"
						buttonRef={buttonRef}
						size="small"
					/>
				</AnimatedButtonContainer>
			</DisplayValueContainer>
		</FormGroup>
	);
};
