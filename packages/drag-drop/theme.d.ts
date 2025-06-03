// import original module declarations
import 'styled-components';
import { ITheme, ISemanticTheme } from '@campaign-buddy/themes';

type MergedTheme = ITheme & ISemanticTheme;

// and extend them!
declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	export interface DefaultTheme extends MergedTheme {}
}
