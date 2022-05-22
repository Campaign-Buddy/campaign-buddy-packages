import styled from 'styled-components';
import { MultiSelect as GenericMultiSelectCore } from '@blueprintjs/select';
import { baseInputStyles } from '../input/Input.styled';
import { defaultTheme } from '../theme';
import { IOption } from './IOption';

const MultiSelectCore = GenericMultiSelectCore.ofType<IOption>();

export const StyledMultiSelectCore = styled(MultiSelectCore)`
	div.bp4-input {
		${baseInputStyles}
		align-items: center;

		& > .bp4-icon {
			padding-right: 8px;
			color: ${({ theme }) => theme.legacyCoreUi.colors.text};
		}
	}

	span.bp4-popover-target {
		width: 100%;
	}

	.bp4-tag {
		background-color: ${({ theme }) => theme.legacyCoreUi.colors.primary};
	}
`;
StyledMultiSelectCore.defaultProps = {
	theme: defaultTheme,
};
