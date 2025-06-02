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
import { useCallback, useMemo } from 'react';
import { StyledContentContainer, StyledDivider } from './styled';
import { ControlGroup } from '@campaign-buddy/accessibility';
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

	const close = useCallback(() => setIsOpen(false), []);

	const handleContentClick = useCallback(() => close(), []);

	return (
		<DropdownMenuContextProvider close={close}>
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
	props: React.PropsWithChildren<DropdownMenuButtonProps>
) {
	return <Button {...props} />;
},
referenceTag);

DropdownMenu.Content = tagComponent(function DropdownMenuContent({
	children,
}: {
	children: React.ReactNode;
}) {
	const items = useTaggedChildren(children, itemTag);
	const { close } = useDropdownMenuContext();

	const menuItemContext = useMemo<MenuItemContextData>(() => {
		const anyItemHasIcon = items.some((x) => Boolean((x as any).props?.icon));

		return {
			reserveIconSpace: anyItemHasIcon,
		};
	}, []);

	return (
		<MenuItemContext.Provider value={menuItemContext}>
			<ControlGroup initiallyFocused onBlur={close}>
				<StyledContentContainer>{items}</StyledContentContainer>
			</ControlGroup>
		</MenuItemContext.Provider>
	);
},
contentTag);

DropdownMenu.Item = tagComponent(DropdownMenuItem, itemTag);
DropdownMenu.Divider = tagComponent(function DropdownMenuDivider() {
	return <StyledDivider />;
}, itemTag);
