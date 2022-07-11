import React, { useState } from 'react';
import { PaneComponentProps, PaneDefinition } from '../src';

function CharacterSheet({ location }: PaneComponentProps) {
	return <p>I am character sheet at {location}</p>;
}

function NotesTool({ location }: PaneComponentProps) {
	const [state, setState] = useState(0);

	return (
		<div>
			<p>I maintain my state: {state}</p>
			<button onClick={() => setState(state + 1)}>Increment</button>
			<p>I am notes tool at {location}</p>
		</div>
	);
}

export const paneDefinitions: Record<string, PaneDefinition> = {
	character: {
		defaultIcon: { kind: 'icon', icon: 'hat' },
		defaultTitle: 'Character tool',
		Component: CharacterSheet,
	},
	note: {
		defaultIcon: { kind: 'icon', icon: 'edit' },
		defaultTitle: 'Notes tool',
		Component: NotesTool,
	},
};
