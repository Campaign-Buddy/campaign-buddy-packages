import styled from 'styled-components';
import { MultiSelect as GenericMultiSelectCore } from '@blueprintjs/select';
import { baseInputStyles } from '../input/Input.styled';
import { defaultTheme } from '../theme';
import { IOption } from './IOption';

const MultiSelectCore = GenericMultiSelectCore.ofType<IOption>();

export const StyledMultiSelectCore = styled(MultiSelectCore)`
	div.bp3-input {
		${baseInputStyles}
		align-items: center;

		& > .bp3-icon {
			padding-right: 8px;
		}
	}

	span.bp3-popover-target {
		width: 100%;
	}

	.bp3-tag {
		background-color: ${({ theme }) => theme.colors.primary};
	}
`;
StyledMultiSelectCore.defaultProps = {
	theme: defaultTheme,
};
