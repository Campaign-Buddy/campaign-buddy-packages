import { cruise } from 'dependency-cruiser';
import path from 'path';
import {
	getAllLocalPackages,
	readPackageJson,
	readTsConfig,
} from './localPackageHelpers';

const allPackageFolderNames = getAllLocalPackages();
const allPackageNames = allPackageFolderNames.map(
	(x) => `@campaign-buddy/${x}`
);

for (const packageName of allPackageFolderNames) {
	validateAllCrossPackageDeps(packageName);
}

function validateAllCrossPackageDeps(packageName: string) {
	const packageSrcDir = path.join('./packages/', packageName, 'src');
	const result = cruise([packageSrcDir]);

	const packageJson = readPackageJson(packageName);
	const tsConfig = readTsConfig(packageName);

	const allDependencies = [
		...Object.keys(packageJson.dependencies ?? {}),
		...Object.keys(packageJson.devDependencies ?? {}),
	].filter((x) => allPackageNames.includes(x));

	const tsConfigReferences =
		tsConfig.references
			?.map((x: any) => {
				const resolved = path.resolve(
					path.resolve(packageSrcDir, '..'),
					x.path
				);
				const match = /packages(?:\/|\\)([^/\\]+)(?:\/|\\)tsconfig\.json/.exec(
					resolved
				);
				if (match) {
					return match[1];
				}
			})
			.map((x: string) => `@campaign-buddy/${x}`) ?? [];

	if (!allDependencies.every((x) => tsConfigReferences.includes(x))) {
		console.error(allDependencies, tsConfigReferences);
		throw new Error(
			`expected tsConfigReferences to contain every dependency from package.json in packages/${packageName}`
		);
	}

	if (result.exitCode !== 0) {
		console.error(result.output);
		throw new Error('dependency-cruiser returned a non-0 exit code');
	}

	if (typeof result.output === 'string') {
		console.error(result.output);
		throw new Error('dependency-cruiser returned unexpected output');
	}

	const errors: string[] = [];
	for (const module of result.output.modules) {
		if (
			!module.source.startsWith(`packages/${packageName}`) ||
			/^packages\/[a-zA-Z-]+\/dist/.test(module.source)
		) {
			continue;
		}

		for (const moduleDep of module.dependencies) {
			if (moduleDep.module.startsWith('@campaign-buddy')) {
				if (!allDependencies.includes(moduleDep.module)) {
					errors.push(
						`detected unlisted local module reference (to ${moduleDep.module}) in ${module.source} (auditing ${packageName})`
					);
				}
			} else if (moduleDep.resolved.startsWith('packages')) {
				if (moduleDep.resolved.startsWith(`packages/${packageName}`)) {
					continue;
				} else {
					errors.push(
						`detected package reference via relative import (to ${moduleDep.module}) in ${module.source}`
					);
				}
			}
		}
	}

	if (errors.length) {
		throw new Error(errors.join('\n'));
	}
}
