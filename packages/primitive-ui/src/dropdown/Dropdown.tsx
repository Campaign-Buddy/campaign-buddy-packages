import React from 'react';
import { useFloating, autoUpdate } from '@floating-ui/react-dom';
import { tagComponent, useSingleTaggedChild } from './useSingleTaggedChild';
import { ReferenceContainer } from './styled';

export interface DropdownProps {
	isOpen: boolean;
	children: React.ReactNode;
	setIsOpen: (isOpen: boolean) => void;
}

export function Dropdown({ isOpen, children }: DropdownProps) {
	const button = useSingleTaggedChild(children, dropdownReferenceSymbol);
	const content = useSingleTaggedChild(children, dropdownContentSymbol);

	const { refs, floatingStyles } = useFloating({
		whileElementsMounted: autoUpdate,
	});

	if (!button || !content) {
		throw new Error(
			'Exactly one button and one content child is required for Dropdown'
		);
	}

	return (
		<>
			<ReferenceContainer ref={refs.setReference}>{button}</ReferenceContainer>
			{isOpen && (
				<div ref={refs.setFloating} style={floatingStyles}>
					{content}
				</div>
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
