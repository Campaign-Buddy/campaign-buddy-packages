/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const operationKinds = {
	add: 'add',
	remove: 'remove',
};

function modifyDependency(packageName, isDev, operation = 'add') {
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

	const depList =
		(isDev ? packageJson.devDependencies : packageJson.dependencies) ?? {};

	if (operation === operationKinds.add) {
		if (!depList[fullPackageName] || depList[fullPackageName] !== version) {
			depList[fullPackageName] = version;
		} else {
			console.log('package is already installed');
			return;
		}
	} else if (operation === operationKinds.remove) {
		if (!depList[fullPackageName]) {
			console.log('package already is uninstalled');
			return;
		} else {
			depList[fullPackageName] = undefined;
		}
	} else {
		throw new Error(`unknown operation: ${operation}`);
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

	child.stdout.on('data', (data) => console.log(data));
	child.stderr.on('data', (data) => console.error(data));
}

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

module.exports = {
	modifyDependency,
	operationKinds,
	normalizePackageName,
};
