import { useCallback, useState } from 'react';
import {
	PaneComponentProps,
	PaneDefinition,
	TabIcon,
	useTabTitle,
} from '../src';
import { useTabIcon } from '../src/components/pane-hooks/useTabIcon';

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

const iconPool: TabIcon[] = [
	{
		kind: 'icon',
		icon: 'profile',
	},
	{
		kind: 'image',
		src: 'https://via.placeholder.com/75x100',
	},
];

function TitleChangingTool() {
	const [isRenderingSub, setIsRenderingSub] = useState(false);
	const [iconIndex, setIconIndex] = useState(0);
	const [title, setTitle] = useState('Normal title');

	useTabIcon(iconPool[iconIndex]);
	useTabTitle(title);

	const rotateTabIndex = useCallback(() => {
		setIconIndex((prev) => (prev === iconPool.length - 1 ? 0 : prev + 1));
	}, []);

	return (
		<div>
			<p>I can change my title</p>
			<input value={title} onChange={(e) => setTitle(e.target.value)} />
			<div>
				<button onClick={() => setIsRenderingSub(!isRenderingSub)}>
					Show sub component
				</button>
				<button onClick={rotateTabIndex}>Change icon</button>
			</div>
			{isRenderingSub && <TitleChangingSubTool />}
		</div>
	);
}

function TitleChangingSubTool() {
	useTabTitle('Subtitle');

	return <p>I change the title</p>;
}

export const paneDefinitions: Record<string, PaneDefinition> = {
	character: {
		defaultIcon: { kind: 'icon', icon: 'character' },
		defaultTitle: 'Character tool',
		Component: CharacterSheet,
	},
	note: {
		defaultIcon: { kind: 'icon', icon: 'note' },
		defaultTitle: 'Notes tool',
		Component: NotesTool,
	},
	tabHookTest: {
		defaultIcon: { kind: 'icon', icon: 'd20' },
		defaultTitle: 'Default title',
		Component: TitleChangingTool,
	},
};
