import {
	tagComponent,
	useDebouncedCallback,
	useSingleTaggedChild,
} from '@campaign-buddy/common-hooks';
import { Dropdown } from '../dropdown';
import { useCallback, useState } from 'react';
import { TooltipContentContainer, TooltipReferenceContainer } from './styled';

const referenceSymbol = Symbol('TooltipReference');
const contentSymbol = Symbol('TooltipContent');

export interface TooltipProps {
	disabled?: boolean;
}

function Tooltip({
	children,
	disabled,
}: React.PropsWithChildren<TooltipProps>) {
	const [isOpen, setIsOpen] = useState(false);
	const content = useSingleTaggedChild(children, contentSymbol);
	const reference = useSingleTaggedChild(children, referenceSymbol);

	const setIsOpenSoon = useDebouncedCallback(setIsOpen, 500);

	const openTooltip = useCallback(() => setIsOpenSoon(true), [setIsOpenSoon]);
	const closeTooltip = useCallback(() => setIsOpenSoon(false), [setIsOpenSoon]);

	return (
		<Dropdown
			isOpen={isOpen && !disabled}
			setIsOpen={setIsOpen}
			referenceGap="small"
		>
			<Dropdown.Reference>
				<TooltipReferenceContainer
					onMouseEnter={openTooltip}
					onMouseLeave={closeTooltip}
					onFocus={openTooltip}
					onBlur={openTooltip}
				>
					{reference}
				</TooltipReferenceContainer>
			</Dropdown.Reference>
			<Dropdown.Content>
				<TooltipContentContainer
					onMouseEnter={openTooltip}
					onMouseLeave={closeTooltip}
				>
					{content}
				</TooltipContentContainer>
			</Dropdown.Content>
		</Dropdown>
	);
}

const TooltipContent = tagComponent(({ children }: React.PropsWithChildren) => {
	return <>{children}</>;
}, contentSymbol);
TooltipContent.displayName = 'TooltipContent';

const TooltipReference = tagComponent(
	({ children }: React.PropsWithChildren) => {
		return <>{children}</>;
	},
	referenceSymbol
);
TooltipReference.displayName = 'TooltipReference';

Tooltip.Content = TooltipContent;
Tooltip.Reference = TooltipReference;

export { Tooltip };
