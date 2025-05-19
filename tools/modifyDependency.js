import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

export const operationKinds = {
	add: 'add',
	remove: 'remove',
};

export function modifyDependency(
	packageName,
	isDev,
	operation = 'add',
	isPeer = false
) {
	const dir = process.cwd();
	const tsConfigPath = path.join(dir, '/tsconfig.json');
	const tsConfigRaw = fs.readFileSync(tsConfigPath, {
		encoding: 'utf-8',
	});
	const tsConfig = JSON.parse(tsConfigRaw);

	const normalizedName = normalizePackageName(packageName);
	const fullPackageName = `@campaign-buddy/${normalizedName}`;
	const version = getCurrentVersion(normalizedName);

	const packageJsonPath = path.join(dir, '/package.json');
	const packageJsonRaw = fs.readFileSync(packageJsonPath, {
		encoding: 'utf-8',
	});
	const packageJson = JSON.parse(packageJsonRaw);

	const depLists = [
		(isDev ? packageJson.devDependencies : packageJson.dependencies) ?? {},
		isPeer ? packageJson.peerDependencies ?? {} : null,
	].filter(Boolean);

	for (const depList of depLists) {
		if (operation === operationKinds.add) {
			if (!depList[fullPackageName] || depList[fullPackageName] !== version) {
				depList[fullPackageName] = version;
			} else {
				console.log('package is already installed');
				continue;
			}
		} else if (operation === operationKinds.remove) {
			if (!depList[fullPackageName]) {
				console.log('package already is uninstalled');
				continue;
			} else {
				depList[fullPackageName] = undefined;
			}
		} else {
			throw new Error(`unknown operation: ${operation}`);
		}
	}

	console.log(packageJson);
	fs.writeFileSync(
		packageJsonPath,
		`${JSON.stringify(packageJson, null, '\t')}\n`,
		{ encoding: 'utf-8' }
	);

	const referencePath = `../${packageName}/tsconfig.json`;
	if (operation === operationKinds.add) {
		tsConfig.references.push({
			path: referencePath,
		});
	} else {
		const index = tsConfig.references.findIndex(
			(x) => x.path === referencePath
		);
		tsConfig.references.splice(index, 1);
	}

	fs.writeFileSync(tsConfigPath, `${JSON.stringify(tsConfig, null, '\t')}\n`, {
		encoding: 'utf-8',
	});

	const child = exec('yarn');

	child.stdout.on('data', (data) => process.stdout.write(data));
	child.stderr.on('data', (data) => process.stderr.write(data));
}

export function normalizePackageName(name) {
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
