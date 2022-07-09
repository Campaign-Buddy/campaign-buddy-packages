export function removeSize(
	sizes: number[],
	removeAtIndex: number,
	targetIndex?: number
): number[] {
	if (sizes.length <= 1) {
		return [];
	}

	const copy = [...sizes];

	const sizeOfRemoved = sizes[removeAtIndex];

	if (
		typeof targetIndex === 'number' &&
		targetIndex >= 0 &&
		targetIndex !== removeAtIndex
	) {
		copy[targetIndex] += sizeOfRemoved;
		copy.splice(removeAtIndex, 1);
	} else {
		copy.splice(removeAtIndex, 1);
		const sizeToGiveToEach = sizeOfRemoved / copy.length;
		for (let i = 0; i < copy.length; i++) {
			copy[i] += sizeToGiveToEach;
		}
	}

	return copy;
}

export function addSize(
	sizes: number[],
	insertAtIndex: number,
	targetIndex?: number
): number[] {
	if (sizes.length === 0) {
		return [100];
	}

	const copy = [...sizes];

	const targetIndices: number[] = [];
	if (
		typeof targetIndex === 'number' &&
		targetIndex >= 0 &&
		targetIndex < sizes.length
	) {
		targetIndices.push(targetIndex);
	} else {
		if (insertAtIndex > 0) {
			targetIndices.push(insertAtIndex - 1);
		}

		if (insertAtIndex < sizes.length) {
			targetIndices.push(insertAtIndex);
		}
	}

	const totalSize = targetIndices.reduce((total, cur) => total + sizes[cur], 0);
	const newSize = totalSize / (targetIndices.length + 1);

	for (const index of targetIndices) {
		copy[index] = newSize;
	}
	copy.splice(insertAtIndex, 0, newSize);

	return copy;
}
