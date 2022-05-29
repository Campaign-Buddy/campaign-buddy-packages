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

async function createPackageJson(packageName, isReact) {
	const templateName = isReact
		? 'reactPackageTemplate.json'
		: 'packageTemplate.json';
	const rawTemplate = await fs.readFile(path.join(__dirname, templateName), {
		encoding: 'utf-8',
	});

	const template = JSON.parse(rawTemplate);

	template.name = `@campaign-buddy/${packageName}`;

	if (isReact) {
		template[
			'storybook'
		] = `cross-env STORYBOOK_PACKAGE_SCOPE=${packageName} yarn --cwd ../../ storybook`;
	}

	await fs.writeFile(
		path.join(packagesPath, packageName, 'package.json'),
		JSON.stringify(template, null, '\t'),
		{ encoding: 'utf-8' }
	);
}

async function createTsconfig(packageName, isReact) {
	const templateName = isReact
		? 'reactTsconfigTemplate.json'
		: 'tsconfigTemplate.json';

	await fs.copyFile(
		path.join(__dirname, templateName),
		path.join(packagesPath, packageName, 'tsconfig.json')
	);
}

async function addThemeDeclaration(packageName) {
	await fs.copyFile(
		path.join(__dirname, 'themeTemplate.d.ts'),
		path.join(packagesPath, packageName, 'theme.d.ts')
	);
}

async function createSampleIndex(packageName) {
	const sampleContent = `export const greeting = 'Hello world!';\n`;
	await fs.writeFile(
		path.join(packagesPath, packageName, 'src', 'index.ts'),
		sampleContent,
		{ encoding: 'utf-8' }
	);
}

async function createPackage(packageName, isReact) {
	await ensurePackageFolders(packageName);

	if (isReact) {
		await addThemeDeclaration(packageName);
	}

	await createPackageJson(packageName, isReact);
	await createTsconfig(packageName, isReact);
	await createSampleIndex(packageName);
}

const program = new Command();

program
	.requiredOption(
		'-p, --package-name <name>',
		'The name of the package to create'
	)
	.option('-r, -R, --react', 'Create this package as a react package');

program.parse();

const options = program.opts();
const packageName = options.packageName || options.p;
const isReact = Boolean(options.r || options.R || options.react);
createPackage(packageName, isReact);
