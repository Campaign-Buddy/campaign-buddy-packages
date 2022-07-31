import { IList } from '../../../components';
import { parchment, parchmentLight } from '../../../palette';
import { active, hover } from '../../../palette/colorUtility';
import { BorderRadius, Thickness } from '../../../types';

export const list: IList = {
	item: {
		backgroundColors: [
			{
				normal: parchmentLight,
				hover: hover(parchmentLight),
				focus: hover(parchmentLight),
				selected: parchmentLight,
				active: active(parchmentLight),
			},
			{
				normal: parchment,
				hover: hover(parchment),
				focus: hover(parchment),
				selected: parchment,
				active: active(parchment),
			},
		],
		padding: new Thickness('4 8'),
		borderRadius: new BorderRadius(4),
		iconSize: 18,
		spacing: 6,
		lineHeight: 24,
	},
};
