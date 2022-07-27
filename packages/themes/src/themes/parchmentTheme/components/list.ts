import { IList } from '../../../components';
import { parchmentLight, transparent } from '../../../palette';
import { BorderRadius, Thickness } from '../../../types';

export const list: IList = {
	item: {
		backgroundColors: [transparent, parchmentLight],
		padding: new Thickness('4 8'),
		borderRadius: new BorderRadius(4),
		iconSize: 18,
		spacing: 6,
	},
};
