import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
	PanelLayout,
	PanelLayoutDto,
	PanelLayoutModel,
	PanelModel,
} from '../src';
import { CustomDragLayer } from './CustomDragLayer';
import { paneDefinitions } from './PaneDefinitions';

export default {
	title: 'panel-layout/PanelLayout',
};

const GlobalStyle = createGlobalStyle`
	html, body, #root {
		width: 100%;
		height: 100%;
		padding: 0 !important;
		margin: 0 !important;
	}
`;

const StoryRoot = styled.div`
	height: 100%;
	padding: 8px;
	position: relative;
	display: flex;
	flex-direction: column;
`;

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
							location: 'campaign-buddy:character?characterId=1234&foo=bar',
						},
					],
				},
				{
					kind: 'panel',
					children: [
						{
							kind: 'pane',
							location: 'campaign-buddy:note?noteId=12345',
						},
					],
				},
			],
			sizes: [50, 50],
		},
		{
			kind: 'panelRow',
			children: [
				{
					kind: 'panel',
					children: [
						{
							kind: 'pane',
							location: 'campaign-buddy:tabHookTest',
						},
					],
				},
				{
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
											location: 'campaign-buddy:character?id=someotherid',
										},
									],
								},
							],
							sizes: [100],
						},
						{
							kind: 'panelRow',
							children: [
								{
									kind: 'panel',
									children: [
										{
											kind: 'pane',
											location: 'campaign-buddy:character/with/path?id=someid',
										},
									],
								},
							],
							sizes: [100],
						},
						{
							kind: 'panelRow',
							children: [
								{
									kind: 'panel',
									children: [
										{
											kind: 'pane',
											location: 'campaign-buddy:note/with/path?id=someid#hash',
										},
									],
								},
							],
							sizes: [100],
						},
					],
					sizes: [25, 25, 50],
				},
			],
			sizes: [50, 50],
		},
	],
	sizes: [35, 65],
};

const layout = PanelLayoutModel.create(layoutDto);

function addNewPane() {
	const firstPanel = layout.getChildren()[0].getChildren()[0];

	if (firstPanel instanceof PanelModel) {
		firstPanel.addPane({ location: 'campaign-buddy:note', kind: 'pane' });
	}
}

function addNewPanel() {
	const firstRow = layout.getChildren()[0];

	firstRow.addPanel({
		kind: 'panel',
		children: [{ kind: 'pane', location: 'campaign-buddy:character' }],
	});
}

function serialize() {
	console.log('serializing');
	console.log(layout, layout.toJson());
}

export const Primary = () => {
	return (
		<StoryRoot>
			<DndProvider backend={HTML5Backend}>
				<GlobalStyle />
				<div>
					<button onClick={addNewPane}>Add pane</button>
					<button onClick={addNewPanel}>Add panel</button>
					<button onClick={serialize}>Serialize</button>
				</div>
				<PanelLayout panelLayout={layout} paneDefintions={paneDefinitions} />
				<CustomDragLayer />
			</DndProvider>
		</StoryRoot>
	);
};
Primary.parameters = {
	backgrounds: { default: 'campaign-buddy-app' },
};
