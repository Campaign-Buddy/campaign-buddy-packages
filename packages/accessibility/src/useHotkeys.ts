import { useCallback, useMemo, useRef } from 'react';
import isHotkey from 'is-hotkey';
import { useDomEventHandler, useDomNode, useRefEffect, useRefEventHandler } from '@campaign-buddy/common-hooks';

type HotkeyHandler = () => void;

type HotkeyMap = Record<string, HotkeyHandler>;

export function useGlobalHotkeys(hotkeys: HotkeyMap, enabled = true) {
	const handler = useHotkeyEventHandler(hotkeys);
	const body = useDomNode('body');
	useDomEventHandler(body, 'keydown', handler, enabled);
}

export function useScopedHotkeys(hotkeys: HotkeyMap, enabled = true) {
	const handler = useHotkeyEventHandler(hotkeys);
	return useRefEventHandler('keydown', handler, enabled);
}

function useHotkeyEventHandler(hotkeys: HotkeyMap) {
	const hotkeysRef = useRef(hotkeys);
	hotkeysRef.current = hotkeys;

	const parsedHotkeys = useMemo(
		() =>
			Object.keys(hotkeys).map((key) => ({
				handler: () => hotkeysRef.current[key]?.(),
				eventIsHotkey: isHotkey(key),
			})),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		Object.keys(hotkeys)
	);

	return useCallback(
		(event: KeyboardEvent) => {
			for (const { handler, eventIsHotkey } of parsedHotkeys) {
				if (eventIsHotkey(event)) {
					handler();
				}
			}
		},
		[parsedHotkeys]
	);
}
