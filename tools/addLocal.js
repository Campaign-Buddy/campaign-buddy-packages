/* eslint-disable @typescript-eslint/no-var-requires */

const { Command } = require('commander');
const { modifyDependency, operationKinds } = require('./modifyDependency');

const program = new Command();

program
	.argument(
		'<packageName>',
		'The package to install, optionally prefixed with @campaign-buddy/'
	)
	.option('-d, -D, --dev', 'Add this package as a dev dependency')
	.option('-p, -D, --peer', 'Add this package as a peer dependency')
	.action((packageName, options) => {
		const isPeer = options.P || options.p || options.peer;
		const isDev = options.D || options.d || options.dev || isPeer;

		modifyDependency(packageName, isDev, operationKinds.add, isPeer);
	})
	.parse(process.argv);
