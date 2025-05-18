import React from 'react';
import { useFloating, autoUpdate, flip, shift } from '@floating-ui/react-dom';
import { tagComponent, useSingleTaggedChild } from './useSingleTaggedChild';
import { ReferenceContainer } from './styled';
import { useDomNode } from './useDomNode';
import { createPortal } from 'react-dom';
import { useOnClickOutside, useRefBoundary } from './useOnClickOutside';
import { useCombinedRefs } from '@campaign-buddy/common-hooks';

export interface DropdownProps {
	isOpen: boolean;
	children: React.ReactNode;
	setIsOpen: (isOpen: boolean) => void;
	portalElementSelector?: string;
}

export function Dropdown({
	isOpen,
	children,
	setIsOpen,
	portalElementSelector,
}: DropdownProps) {
	const button = useSingleTaggedChild(children, dropdownReferenceSymbol);
	const content = useSingleTaggedChild(children, dropdownContentSymbol);
	const portalElement = useDomNode(portalElementSelector ?? 'body');

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
					<div ref={floatingRef} style={floatingStyles}>
						{content}
					</div>,
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
