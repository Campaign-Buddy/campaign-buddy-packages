import { Command } from 'commander';
import JSON5 from 'json5';
import { modifyConfigurations } from './localPackageHelpers';

const program = new Command();

program
	.argument(
		'<mutation>',
		'The immutability-helper mutation object to be applied to the configuration'
	)
	.action((mutation) => {
		const parsedMutation = JSON5.parse(mutation);
		modifyConfigurations('tsconfig.json', parsedMutation);
	})
	.parse();
