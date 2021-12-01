/* eslint-disable @typescript-eslint/no-var-requires */

const { Command } = require('commander');
const fs = require('fs/promises');
const path = require('path');

const packagesPath = path.join(__dirname, '../../packages');

async function ensurePackageFolders(packageName) {
	const packageRootPath = path.join(packagesPath, packageName);
	await fs.mkdir(packageRootPath);

	await fs.mkdir(path.join(packageRootPath, 'src'));
}

async function createPackageJson(packageName) {
	const rawTemplate = await fs.readFile(
		path.join(__dirname, 'packageTemplate.json'),
		{
			encoding: 'utf-8',
		}
	);

	const template = JSON.parse(rawTemplate);

	template.name = `@campaign-buddy/${packageName}`;

	await fs.writeFile(
		path.join(packagesPath, packageName, 'package.json'),
		JSON.stringify(template, null, '\t'),
		{ encoding: 'utf-8' }
	);
}

async function createTsconfig(packageName) {
	await fs.copyFile(
		path.join(__dirname, 'tsconfigTemplate.json'),
		path.join(packagesPath, packageName, 'tsconfig.json')
	);
}

async function createSampleIndex(packageName) {
	const sampleContent = `export const greeting = 'Hello world!;'\n`;
	await fs.writeFile(
		path.join(packagesPath, packageName, 'src', 'index.ts'),
		sampleContent,
		{ encoding: 'utf-8' }
	);
}

async function createPackage(packageName) {
	await ensurePackageFolders(packageName);
	await createPackageJson(packageName);
	await createTsconfig(packageName);
	await createSampleIndex(packageName);
}

const program = new Command();

program.requiredOption(
	'-p, --package-name <name>',
	'The name of the package to create'
);

program.parse();

createPackage(program.opts().packageName);
