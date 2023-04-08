import React from 'react';
import { Toolbar, ToolbarButton } from '../src';

export default {
	title: 'toolbar/Toolbar',
	parameters: {
		layout: 'fullscreen',
	},
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function Primary() {
	return (
		<Toolbar orientation="horizontal">
			<ToolbarButton text="Characters" icon="person" onClick={noop} />
		</Toolbar>
	);
}
