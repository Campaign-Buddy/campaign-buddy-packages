import { backgroundColor, themed, variant } from '@campaign-buddy/theme-util';
import styled from 'styled-components';

export type DropdownVariant = 'default' | 'flush';

export const ReferenceContainer = styled.div`
	display: inline-block;
`;

export const DropdownContentContainer = styled.div<{
	variant: DropdownVariant;
}>`
	box-shadow: ${themed.shadows.dropdown};
	padding: ${variant<DropdownVariant>({
		_: themed.sizes.uiContentPadding.medium,
		flush: 0,
	})};
	${backgroundColor(themed.colors.background.dropdown)}
	border-radius: ${themed.borderRadii.default};
`;
