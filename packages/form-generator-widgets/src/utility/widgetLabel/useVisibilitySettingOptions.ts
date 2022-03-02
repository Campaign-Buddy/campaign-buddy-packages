import { MenuItem } from '@campaign-buddy/core-ui';
import { FieldSettings } from '@campaign-buddy/frontend-types';
import { useMemo } from 'react';
import { useVisibilitySettings } from '../../FormWidgetProvider';

export function useVisibilitySettingOptions(
	fieldSettings: FieldSettings<any> | undefined,
	updateFieldSettings: ((fieldSettings: FieldSettings<any>) => void) | undefined
): MenuItem[] {
	const visibilitySettings = useVisibilitySettings();

	return useMemo(() => {
		if (!updateFieldSettings) {
			return [];
		}

		const setVisibility = (roles?: string[]) => {
			updateFieldSettings({
				...fieldSettings,
				visibleRoles: roles,
			});
		};

		const isActiveVisibilitySetting = (roles: string[]) => {
			if (!fieldSettings?.visibleRoles) {
				return false;
			}

			const uniqueNewRoles = new Set(roles);
			const uniqueRoles = new Set(fieldSettings.visibleRoles);

			return (
				uniqueNewRoles.size === uniqueRoles.size &&
				[...uniqueNewRoles].every((x) => uniqueRoles.has(x))
			);
		};

		return [
			{
				displayText: 'Visibility settings',
				icon: 'eye-open',
				subItems: [
					{
						displayText: 'Default visibility',
						icon: !fieldSettings?.visibleRoles ? 'tick' : 'blank',
						onClick: () => setVisibility(),
					},
					...visibilitySettings.map<MenuItem>((setting) => ({
						displayText: setting.label,
						icon: isActiveVisibilitySetting(setting.roles) ? 'tick' : 'blank',
						onClick: () => setVisibility(setting.roles),
					})),
				],
			},
		];
	}, [fieldSettings, updateFieldSettings, visibilitySettings]);
}
