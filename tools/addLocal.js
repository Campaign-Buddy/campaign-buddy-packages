/* eslint-disable @typescript-eslint/no-var-requires */

const { Command } = require('commander');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const program = new Command();

program
	.arguments(
		'<packageName>',
		'The package to install, optionally prefixed with @campaign-buddy/'
	)
	.option('-d, -D, --dev', 'Add this package as a dev dependency')
	.action((packageName, options) => {
		const dir = process.cwd();
		const tsConfigRaw = fs.readFileSync(path.join(dir, '/tsconfig.json'), {
			encoding: 'utf-8',
		});
		const tsConfig = JSON.parse(tsConfigRaw);

		const normalizedName = normalizePackageName(packageName);
		const version = getCurrentVersion(normalizedName);

		exec(
			`yarn add @campaign-buddy/${normalizedName}@${version}${
				options.dev ? ' -D' : ''
			}`
		);
		tsConfig.references.push({
			path: `../${packageName}/tsconfig.json`,
		});
	})
	.parse(process.argv);

function normalizePackageName(name) {
	const prefix = '@campaign-buddy/';
	if (name.startsWith(prefix)) {
		return name.substring(prefix.length);
	}

	return name;
}

function getCurrentVersion(name) {
	const packageJsonPath = path.join(
		process.cwd(),
		'../',
		normalizePackageName(name),
		'/package.json'
	);

	const packageJsonRaw = fs.readFileSync(packageJsonPath, {
		encoding: 'utf-8',
	});
	const packageJson = JSON.parse(packageJsonRaw);

	return packageJson.version;
}
