import React from 'react';
import { useFloating, autoUpdate, flip, shift } from '@floating-ui/react-dom';
import {
	tagComponent,
	useSingleTaggedChild,
	useDomNode,
	useOnClickOutside,
	useRefBoundary,
} from '@campaign-buddy/common-hooks';
import {
	DropdownContentContainer,
	DropdownVariant,
	ReferenceContainer,
} from './styled';
import { createPortal } from 'react-dom';
import { useCombinedRefs } from '@campaign-buddy/common-hooks';
import { useGlobalHotkeys } from './useGlobalHotkeys';

export interface DropdownProps extends RequireChildren {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	portalElementSelector?: string;
	variant?: DropdownVariant;
}

export function Dropdown({
	isOpen,
	children,
	setIsOpen,
	portalElementSelector,
	variant,
}: DropdownProps) {
	const button = useSingleTaggedChild(children, dropdownReferenceSymbol);
	const content = useSingleTaggedChild(children, dropdownContentSymbol);
	const portalElement = useDomNode(portalElementSelector ?? 'body');

	useGlobalHotkeys(
		{
			esc: () => setIsOpen(false),
		},
		isOpen
	);

	const contentClickOutsideBoundary = useRefBoundary();
	const buttonClickOutsideBoundary = useRefBoundary();
	useOnClickOutside(
		() => {
			if (!isOpen) {
				return;
			}

			setIsOpen(false);
		},
		contentClickOutsideBoundary,
		buttonClickOutsideBoundary
	);

	const { refs, floatingStyles } = useFloating({
		whileElementsMounted: autoUpdate,
		middleware: [flip(), shift()],
		placement: 'bottom-start',
	});

	const floatingRef = useCombinedRefs(
		refs.setFloating,
		contentClickOutsideBoundary
	);
	const referenceContainerRef = useCombinedRefs(
		refs.setReference,
		buttonClickOutsideBoundary
	);

	if (!button || !content) {
		throw new Error(
			'Exactly one button and one content child is required for Dropdown'
		);
	}

	return (
		<>
			<ReferenceContainer ref={referenceContainerRef}>
				{button}
			</ReferenceContainer>
			{isOpen &&
				portalElement &&
				createPortal(
					<DropdownContentContainer
						variant={variant ?? 'default'}
						ref={floatingRef}
						style={floatingStyles}
					>
						{content}
					</DropdownContentContainer>,
					portalElement
				)}
		</>
	);
}

const dropdownReferenceSymbol = Symbol('DropdownReference component');
Dropdown.Reference = tagComponent(function DropdownReference({
	children,
}: RequireChildren) {
	return <>{children}</>;
},
dropdownReferenceSymbol);

const dropdownContentSymbol = Symbol('DropdownContent component');
Dropdown.Content = tagComponent(function DropdownContent({
	children,
}: RequireChildren) {
	return <>{children}</>;
},
dropdownContentSymbol);

interface RequireChildren {
	children: React.ReactNode;
}
