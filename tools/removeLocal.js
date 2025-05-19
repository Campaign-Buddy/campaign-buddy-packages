import { Command } from 'commander';
import {
	modifyDependency,
	operationKinds,
	normalizePackageName,
} from './modifyDependency.js';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
	.argument(
		'<packageName>',
		'The package to install, optionally prefixed with @campaign-buddy/'
	)
	.action((packageName) => {
		const packageJson = JSON.parse(
			fs.readFileSync(path.join(process.cwd(), '/package.json'))
		);

		let isDev = false;
		const fullName = `@campaign-buddy/${normalizePackageName(packageName)}`;
		console.log(packageJson.devDependencies, fullName);
		if (packageJson.devDependencies[fullName]) {
			isDev = true;
		}

		modifyDependency(packageName, isDev, operationKinds.remove);
	})
	.parse(process.argv);
