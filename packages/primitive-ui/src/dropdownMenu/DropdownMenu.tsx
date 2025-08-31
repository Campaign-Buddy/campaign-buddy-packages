import {
	tagComponent,
	useSingleTaggedChild,
	useTaggedChildren,
} from '@campaign-buddy/common-hooks';
import { Dropdown } from '../dropdown';
import { Button, ButtonProps } from '../button';
import {
	DropdownMenuItem,
	MenuItemContext,
	MenuItemContextData,
} from './DropdownMenuItem';
import { useCallback, useId, useMemo } from 'react';
import { StyledContentContainer, StyledDivider } from './styled';
import {
	CompositeControl,
	useScopedHotkeys,
} from '@campaign-buddy/accessibility';
import {
	DropdownMenuContextProvider,
	useDropdownMenuContext,
} from './DropdownMenuContext';

export interface DropdownMenuProps {
	isOpen: boolean;
	children: React.ReactNode;
	setIsOpen: (isOpen: boolean) => void;
	portalElementSelector?: string;
}

const referenceTag = Symbol('DropdownMenu reference');
const contentTag = Symbol('DropdownMenu content');
const itemTag = Symbol('DropdownMenu item');

export function DropdownMenu({
	isOpen,
	setIsOpen,
	children,
	portalElementSelector,
}: DropdownMenuProps) {
	const reference = useSingleTaggedChild(children, referenceTag);
	const content = useSingleTaggedChild(children, contentTag);

	const sharedId = useId();

	const focusButton = useCallback(() => {
		document.getElementById(`${sharedId}-button`)?.focus();
	}, [sharedId]);

	const close = useCallback(() => {
		setIsOpen(false);
		queueMicrotask(() => focusButton());
	}, [focusButton, setIsOpen]);
	const open = useCallback(() => setIsOpen(true), [setIsOpen]);

	const handleContentClick = useCallback(() => close(), [close]);

	return (
		<DropdownMenuContextProvider
			isOpen={isOpen}
			open={open}
			close={close}
			sharedId={sharedId}
		>
			<Dropdown
				variant="flush"
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				portalElementSelector={portalElementSelector}
			>
				<Dropdown.Reference>{reference}</Dropdown.Reference>
				<Dropdown.Content>
					<div onClick={handleContentClick}>{content}</div>
				</Dropdown.Content>
			</Dropdown>
		</DropdownMenuContextProvider>
	);
}

export type DropdownMenuButtonProps = ButtonProps;
DropdownMenu.Button = tagComponent(function DropdownMenuButton(
	props: React.PropsWithChildren<
		Omit<DropdownMenuButtonProps, 'leftIcon' | 'rightIcon' | 'onClick'>
	>
) {
	const { isOpen, open, close, sharedId } = useDropdownMenuContext();

	const hotkeys = useScopedHotkeys({
		up: () => {
			open();
		},
		down: () => {
			open();
		},
	});

	return (
		<Button
			aria-haspopup="menu"
			aria-controls={isOpen ? sharedId : undefined}
			aria-expanded={isOpen}
			ref={hotkeys}
			id={`${sharedId}-button`}
			rightIcon={isOpen ? 'chevronUp' : 'chevronDown'}
			onClick={() => (isOpen ? close() : open())}
			{...props}
		/>
	);
},
referenceTag);

DropdownMenu.Content = tagComponent(function DropdownMenuContent({
	children,
}: {
	children: React.ReactNode;
}) {
	const items = useTaggedChildren(children, itemTag);
	const { close, sharedId } = useDropdownMenuContext();

	const menuItemContext = useMemo<MenuItemContextData>(() => {
		const anyItemHasIcon = items.some((x) => Boolean((x as any).props?.icon));

		return {
			reserveIconSpace: anyItemHasIcon,
		};
	}, [items]);

	return (
		<MenuItemContext.Provider value={menuItemContext}>
			<CompositeControl
				aria-orientation="vertical"
				accessibleId={sharedId}
				role="menu"
				initiallyFocused
				onBlur={close}
			>
				<StyledContentContainer>{items}</StyledContentContainer>
			</CompositeControl>
		</MenuItemContext.Provider>
	);
},
contentTag);

DropdownMenu.Item = tagComponent(DropdownMenuItem, itemTag);
DropdownMenu.Divider = tagComponent(function DropdownMenuDivider() {
	return <StyledDivider role="separator" aria-orientation="vertical" />;
}, itemTag);
