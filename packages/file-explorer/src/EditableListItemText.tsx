import { ListItemInput, ListItemText } from '@campaign-buddy/core-ui';
import React, { useCallback, useEffect, useState } from 'react';

export interface EditableListItemTextProps {
	text: string;
	isEditing: boolean;
	onCommit: (newText: string) => void;
	onCancel: () => void;
}

export function EditableListItemText({
	text,
	isEditing,
	onCommit,
	onCancel,
}: EditableListItemTextProps) {
	const [temporaryText, setTemporaryText] = useState(text);

	useEffect(() => {
		if (!isEditing) {
			setTemporaryText(text);
		}
	}, [isEditing, text]);

	const handleOnCommit = useCallback(() => {
		onCommit(temporaryText);
	}, [onCommit, temporaryText]);

	const handleOnCancel = useCallback(() => {
		onCancel();
	}, [onCancel]);

	return isEditing ? (
		<ListItemInput
			value={temporaryText}
			onChange={setTemporaryText}
			onCommit={handleOnCommit}
			onCancel={handleOnCancel}
			selectAllOnFocus
		/>
	) : (
		<ListItemText text={text} />
	);
}
