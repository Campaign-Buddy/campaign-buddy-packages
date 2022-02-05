import { FormGroup } from '@campaign-buddy/core-ui';
import { WidgetProps } from '@campaign-buddy/form-generator';
import {
	documentVersion as currentDocumentVersion,
	RichTextDocument,
	RichTextEditor,
} from '@campaign-buddy/rich-text';
import React, { useCallback, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import semverSatisfies from 'semver/functions/satisfies';
import { useMediaApi } from '../FormWidgetProvider';

interface RichTextData {
	document: RichTextDocument;
	documentVersion: string;
}

const defaultDocument: RichTextDocument = [];
let id = 0;

export const RichTextWidget: React.FC<WidgetProps<RichTextData>> = ({
	value,
	onChange,
	label,
}) => {
	const queryClient = useQueryClient();
	const mediaApi = useMediaApi();
	const htmlId = useMemo(() => `cb-rich-text-editor-${id++}`, []);

	const documentVersion = value?.documentVersion;
	const document = value?.document ?? defaultDocument;

	const handleChange = useCallback(
		(value: RichTextDocument) => {
			onChange({ document: value, documentVersion: currentDocumentVersion });
		},
		[onChange]
	);

	if (
		documentVersion &&
		!semverSatisfies(currentDocumentVersion, `^${documentVersion}`)
	) {
		return <p>Your document version is not compatible with form component</p>;
	}

	return (
		<FormGroup label={label} labelFor={htmlId}>
			<RichTextEditor
				value={document}
				onChange={handleChange}
				queryClient={queryClient}
				mediaApi={mediaApi}
				htmlId={htmlId}
			/>
		</FormGroup>
	);
};
