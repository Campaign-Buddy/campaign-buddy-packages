/* eslint-disable @typescript-eslint/no-var-requires */

const { Command } = require('commander');
const { modifyDependency, operationKinds } = require('./modifyDependency');

const program = new Command();

program
	.arguments(
		'<packageName>',
		'The package to install, optionally prefixed with @campaign-buddy/'
	)
	.option('-d, -D, --dev', 'Add this package as a dev dependency')
	.action((packageName, options) => {
		const isDev = options.D || options.d || options.dev;

		modifyDependency(packageName, isDev, operationKinds.add);
	})
	.parse(process.argv);
