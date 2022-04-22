export function removeSize(
	sizes: number[],
	removeAtIndex: number,
	targetIndex?: number
): number[] {
	const copy = [...sizes];

	copy.splice(removeAtIndex, 1);

	const defaultIndices = [removeAtIndex - 1, removeAtIndex].filter(
		(x) => x >= 0 && x < copy.length
	);

	adjustSizes(
		copy,
		typeof targetIndex === 'number'
			? [targetIndex, ...defaultIndices]
			: defaultIndices
	);
	return copy;
}

export function addSize(
	sizes: number[],
	insertAtIndex: number,
	desiredSize?: number,
	minPreferredSize?: number,
	targetIndex?: number
): number[] {
	const copy = [...sizes];
	copy.splice(insertAtIndex, 0, desiredSize ?? 100);

	const defaultIndices = [insertAtIndex - 1, insertAtIndex + 1].filter(
		(x) => x >= 0 && x < copy.length
	);

	adjustSizes(
		copy,
		typeof targetIndex === 'number'
			? [targetIndex, ...defaultIndices]
			: defaultIndices,
		minPreferredSize
	);
	return copy;
}

function adjustSizes(
	sizes: number[],
	targetIndices: number[],
	minPreferredSize = 0
) {
	const totalSize = sizes.reduce((total, cur) => total + cur, 0);
	let requiredAdjustment = 100 - totalSize;

	// First try to adjust the target indices
	if (targetIndices.length !== 0) {
		requiredAdjustment -= tryApplyAdjustment(
			sizes,
			targetIndices,
			minPreferredSize,
			requiredAdjustment
		);
	}

	if (requiredAdjustment === 0) {
		return;
	}

	const allIndices = [...sizes.keys()];
	let indicesAboveMin = [...allIndices].filter(
		(i) => sizes[i] > minPreferredSize
	);

	// Now try and adjust everyone
	while (
		indicesAboveMin.length > 0 &&
		parseFloat(requiredAdjustment.toFixed(4)) !== 0
	) {
		requiredAdjustment -= tryApplyAdjustment(
			sizes,
			indicesAboveMin,
			minPreferredSize,
			requiredAdjustment
		);
		indicesAboveMin = indicesAboveMin.filter(
			(i) => sizes[i] > minPreferredSize
		);
	}

	if (requiredAdjustment === 0) {
		return;
	}

	tryApplyAdjustment(sizes, allIndices, 0, requiredAdjustment);
}

function tryApplyAdjustment(
	arr: number[],
	targetIndices: number[],
	minValue: number,
	requestedAdjustment: number
): number {
	if (arr.length === 0) {
		return 0;
	}

	const sizeOfTargets = targetIndices
		.map((index) => arr[index])
		.reduce((total, cur) => total + cur, 0);

	const desiredNewSize = sizeOfTargets + requestedAdjustment;
	const totalTargetAdjustment = desiredNewSize - sizeOfTargets;
	const targetAdjustment = totalTargetAdjustment / targetIndices.length;
	let appliedTargetAdjustment = 0;

	for (const targetIndex of targetIndices) {
		const targetSize = arr[targetIndex];

		const newSize = Math.max(targetSize + targetAdjustment, minValue);

		arr[targetIndex] = newSize;

		const actualAdjustment = newSize - targetSize;
		appliedTargetAdjustment += actualAdjustment;
	}

	return appliedTargetAdjustment;
}
