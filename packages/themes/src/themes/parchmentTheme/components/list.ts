import { IList } from '../../../components';
import {
	parchmentExtraLight,
	parchmentLight,
	transparent,
} from '../../../palette';
import { BorderRadius, Thickness } from '../../../types';

export const list: IList = {
	item: {
		backgroundColors: [
			{
				normal: parchmentLight,
				hover: parchmentExtraLight,
				focus: parchmentExtraLight,
				selected: parchmentExtraLight,
			},
			{
				normal: transparent,
				hover: parchmentLight,
				focus: parchmentLight,
				selected: parchmentLight,
			},
		],
		padding: new Thickness('4 8'),
		borderRadius: new BorderRadius(4),
		iconSize: 18,
		spacing: 6,
		lineHeight: 24,
	},
};
