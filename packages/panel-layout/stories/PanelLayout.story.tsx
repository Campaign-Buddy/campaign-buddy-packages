import cuid from 'cuid';
import React from 'react';
import {
	PanelLayout,
	PanelLayoutDto,
	PanelLayoutModel,
	PanelModel,
} from '../src';

export default {
	title: 'AAABCD',
};

const layoutDto: PanelLayoutDto = {
	kind: 'panelLayout',
	children: [
		{
			kind: 'panelRow',
			children: [
				{
					kind: 'panel',
					children: [
						{
							kind: 'pane',
							location: 'characterSheet:characterId=1234&foo=bar',
						},
					],
				},
			],
			sizes: [100],
		},
	],
	sizes: [100],
};

const layout = new PanelLayoutModel(layoutDto);

function addNewPane() {
	const firstPanel = layout.getChildren()[0].getChildren()[0];

	if (firstPanel instanceof PanelModel) {
		firstPanel.addPane({ location: cuid(), kind: 'pane' });
	}
}

function serialize() {
	console.log(layout.toJson());
}

export const Primary = () => {
	return (
		<div>
			<button onClick={addNewPane}>Add pane</button>
			<button onClick={serialize}>Serialize</button>
			<PanelLayout panelLayout={layout} />
		</div>
	);
};

export function Secondary() {
	return <p>HI there</p>;
}
