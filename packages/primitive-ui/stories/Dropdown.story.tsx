import { useState } from 'react';
import { Button, Dropdown, Icon } from '../src';
import { Meta } from '@storybook/react';

export default {
	component: Dropdown,
	title: 'primitive-ui/Dropdown',
} as Meta;

export function Primary() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
			<Dropdown.Reference>
				<Button
					onClick={() => setIsOpen((p) => !p)}
					rightIcon={<Icon name="chevronDown" />}
				>
					Click me
				</Button>
			</Dropdown.Reference>
			<Dropdown.Content>
				<div
					style={{
						width: '200px',
						height: '200px',
					}}
				>
					Content!
				</div>
			</Dropdown.Content>
		</Dropdown>
	);
}
