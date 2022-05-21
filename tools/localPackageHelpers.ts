import fs from 'fs';
import path from 'path';
import { Context } from 'immutability-helper';

export function getAllLocalPackages() {
	const packageFolders = fs.readdirSync(path.join('./packages/'));

	const allPackageNames = [];

	for (const packageFolder of packageFolders) {
		const packageJson = readPackageJson(packageFolder);

		if (packageJson.name !== `@campaign-buddy/${packageFolder}`) {
			throw new Error(
				`Package.json name must match folder name. Expected @campaign-buddy/${packageFolder} but got ${packageJson.name}`
			);
		}

		allPackageNames.push(packageFolder);
	}

	return allPackageNames;
}

export function readPackageJson(packageName: string): any {
	const packageJsonRaw = fs.readFileSync(
		path.join('./packages/', packageName, '/package.json'),
		{ encoding: 'utf-8' }
	);

	try {
		return JSON.parse(packageJsonRaw);
	} catch {
		throw new Error(`could not parse package.json in packages/${packageName}`);
	}
}

export function readTsConfig(packageName: string): any {
	const tsConfigRaw = fs.readFileSync(
		path.join('./packages/', packageName, '/tsconfig.json'),
		{ encoding: 'utf-8' }
	);

	try {
		return JSON.parse(tsConfigRaw);
	} catch {
		throw new Error(`could not parse tsconfig in packages/${packageName}`);
	}
}

export function modifyConfigurations(
	localConfigurationPath: string,
	modifyObj: any
) {
	const localPackages = getAllLocalPackages();

	for (const localPackage of localPackages) {
		modifyConfiguration(
			path.join(
				__dirname,
				'../packages/',
				localPackage,
				localConfigurationPath
			),
			modifyObj
		);
		break;
	}
}

const updateContext = new Context();

updateContext.extend('$filter', (value, arr) => {
	if (!Array.isArray(arr)) {
		return arr;
	}

	return arr.filter((item) => item !== value);
});

export function modifyConfiguration(fullPath: string, modifyObj: any) {
	const contents = fs.readFileSync(fullPath, { encoding: 'utf-8' });
	const parsedContents = JSON.parse(contents);
	const updatedContent = updateContext.update(parsedContents, modifyObj);
	fs.writeFileSync(
		fullPath,
		`${JSON.stringify(updatedContent, null, '\t')}\n`,
		{
			encoding: 'utf-8',
		}
	);
}
