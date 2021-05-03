import React, { useMemo } from 'react';
import { FormGeneratorProps } from './FormGeneratorProps';
import { generateUiLayout, useDataUpdater } from './utility';
import { FormUiLayout } from './FormUiLayout';
import styled from 'styled-components';

export const FormGenerator: React.FC<FormGeneratorProps> = ({
	schema,
	data,
	onChange,
	widgets,
	uiLayout: providedUiLayout,
	UiSection,
}) => {
	const uiLayout = useMemo(() => {
		if (!providedUiLayout) {
			return generateUiLayout(schema)
		}

		return providedUiLayout;
	}, [providedUiLayout]);

	const updateData = useDataUpdater(schema, data, onChange);

	return (
		<FormRoot>
			<FormUiLayout
				uiLayout={uiLayout}
				schema={schema}
				widgetLookup={widgets}
				updateValue={updateData}
				data={data}
				UiSection={UiSection}
			/>
		</FormRoot>
	)
};

const FormRoot = styled.div`
	display: flex;
	flex-direction: column;
`;
