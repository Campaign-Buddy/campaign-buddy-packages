import { DropdownMenu } from '../src';
import { useState } from 'react';

export default {
	title: 'primitive-ui/DropdownMenu',
	component: DropdownMenu,
};

export function Primary() {
	const [isOpen, setIsOpen] = useState(false);
	const [isSelected, setIsSelected] = useState(false);

	return (
		<DropdownMenu isOpen={isOpen} setIsOpen={setIsOpen}>
			<DropdownMenu.Button onClick={() => setIsOpen((p) => !p)}>
				Open
			</DropdownMenu.Button>
			<DropdownMenu.Content>
				<DropdownMenu.Item icon="note" onClick={() => alert('hi')}>
					Say Hi
				</DropdownMenu.Item>
				<DropdownMenu.Item onClick={() => alert('goodbye')}>
					Say Goodbye
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					I am some really long text but you can't click me
				</DropdownMenu.Item>
				<DropdownMenu.Item
					isSelected={isSelected}
					onClick={() => setIsSelected(true)}
				>
					Select me!
				</DropdownMenu.Item>
				<DropdownMenu.Divider />
				<DropdownMenu.Item
					isSelected={!isSelected}
					onClick={() => setIsSelected(false)}
				>
					No select me!
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
}
