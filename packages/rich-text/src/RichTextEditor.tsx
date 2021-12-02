import React, { useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { styleAsInput } from '@campaign-buddy/core-ui';

interface RichTextEditorProps {
	htmlId?: string;
}

const StyledEditable = styleAsInput(Editable);

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ htmlId }) => {
	const editor = useMemo(() => withReact(createEditor()), []);
	const [value, setValue] = useState<Descendant[]>([]);

	return (
		<Slate editor={editor} value={value} onChange={setValue}>
			<StyledEditable id={htmlId} />
		</Slate>
	);
};
