// import original module declarations
import 'styled-components';
import { DefaultTheme as CbTheme } from '@campaign-buddy/core-ui';

// and extend them!
declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	export interface DefaultTheme extends CbTheme {}
}
