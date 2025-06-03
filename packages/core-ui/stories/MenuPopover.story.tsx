import { useState } from 'react';
import { Meta } from '@storybook/react';
import {
	MenuPopover,
	Button,
	MenuItem,
	IconMenuItem,
	IconMenuPopover,
	ContextMenu,
} from '../src';

export default {
	title: 'core-ui/MenuPopover',
	component: MenuPopover,
} as Meta;

const iconMenuItems: IconMenuItem[] = [
	{
		icon: 'align-left',
		altText: 'Align left',
	},
	{
		icon: 'align-center',
		altText: 'Align center',
	},
	{
		icon: 'align-right',
		altText: 'Align right',
	},
	{
		icon: 'align-justify',
		altText: 'Align justify',
	},
];

const items: MenuItem[] = [
	{
		displayText: 'Save',
		icon: 'floppy-disk',
		onClick: () => console.log('save'),
	},
	{
		displayText: 'New',
		icon: 'plus',
		onClick: () => console.log('new'),
	},
	{
		displayText: 'More',
		icon: 'more',
		subItems: [
			{
				displayText: 'Sub A',
			},
			{
				displayText: 'Sub B',
			},
		],
	},
];

export function Primary() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<MenuPopover items={items} onClose={() => setIsOpen(false)} isOpen={isOpen}>
			<Button variant="minimal" onClick={() => setIsOpen(true)}>
				File
			</Button>
		</MenuPopover>
	);
}

export function IconMenu() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<IconMenuPopover
			items={iconMenuItems}
			onClose={() => setIsOpen(false)}
			isOpen={isOpen}
		>
			<Button
				variant="minimal"
				onClick={() => setIsOpen(true)}
				icon="align-center"
			/>
		</IconMenuPopover>
	);
}

export function ContextMenuExample() {
	return (
		<ContextMenu
			menuItems={[
				{
					displayText: 'Foo',
					icon: 'add',
					onClick: () => console.log('foo clicked'),
				},
				{
					displayText: 'Bar',
					icon: 'minus',
					subItems: [
						{
							displayText: 'Baz',
							icon: 'blank',
							onClick: () => console.log('baz clicked'),
							shouldCloseMenuOnClick: false,
						},
					],
				},
			]}
		>
			<p>Right click on me</p>
		</ContextMenu>
	);
}
