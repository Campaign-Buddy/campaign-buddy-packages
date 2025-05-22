import {
	PaneDefinition,
	PanelLayout,
	PanelLayoutModel,
} from '@campaign-buddy/panel-layout';
import { Toolbar } from '@renderer/components/Toolbar';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const panes: Record<string, PaneDefinition> = {
	dummy: {
		Component: () => <div>I am a dummy</div>,
		defaultIcon: { kind: 'icon', icon: 'airplane' },
		defaultTitle: 'Dummy',
	},
};

const Background = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export function CampaignPage() {
	const [panelLayout, setPanelLayout] = useState<PanelLayoutModel>();

	useEffect(() => {
		const layout = PanelLayoutModel.create({
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
									location: 'campaign-buddy:dummy',
								},
							],
						},
					],
					sizes: [100],
				},
			],
			sizes: [100],
		});

		setPanelLayout(layout);
	}, []);

	return (
		<Background>
			<Toolbar />
			{panelLayout && (
				<PanelLayout panelLayout={panelLayout} paneDefintions={panes} />
			)}
		</Background>
	);
}
