import { VirtualFocusController } from './VirtualFocus';
import { useScopedHotkeys } from './useHotkeys';
import { useCombinedRefs } from '@campaign-buddy/common-hooks';

export type ArrowKeyOrientation = 'horizontal' | 'vertical';

export function useArrowKeyVirtualFocus(
	controller: VirtualFocusController,
	orientation: ArrowKeyOrientation = 'vertical'
): React.Ref<HTMLElement> {
	const commonHotkeys = useScopedHotkeys({
		home: () => controller.moveToStart(),
		end: () => controller.moveToEnd(),
		enter: () => controller.getFocused()?.meta?.onActivate?.(),
		space: () => controller.getFocused()?.meta?.onActivate?.(),
	});

	const verticalArrowKeys = useScopedHotkeys({
		up: () => controller.movePrevious(),
		down: () => controller.moveNext(),
	});

	const horizontalArrowKeys = useScopedHotkeys({
		left: () => controller.movePrevious(),
		right: () => controller.moveNext(),
	});

	const verticalHotkeys = useCombinedRefs(commonHotkeys, verticalArrowKeys);
	const horizontalHotkeys = useCombinedRefs(commonHotkeys, horizontalArrowKeys);

	return orientation === 'vertical' ? verticalHotkeys : horizontalHotkeys;
}
