import { CssSerializable } from './CssSerializable';

interface IBorderRadius {
	topLeft?: number;
	topRight?: number;
	bottomRight?: number;
	bottomLeft?: number;
}

export class BorderRadius implements CssSerializable {
	private radius: IBorderRadius;

	constructor(radius: number | IBorderRadius) {
		if (typeof radius === 'number') {
			this.radius = {
				topLeft: radius,
				topRight: radius,
				bottomRight: radius,
				bottomLeft: radius,
			};
		} else {
			this.radius = radius;
		}
	}

	public get topLeft() {
		return this.radius.topLeft ?? 0;
	}

	public get topRight() {
		return this.radius.topRight ?? 0;
	}

	public get bottomRight() {
		return this.radius.bottomRight ?? 0;
	}

	public get bottomLeft() {
		return this.radius.bottomLeft ?? 0;
	}

	public toCss = () => {
		return `${this.radius?.topLeft ?? 0}px ${this.radius?.topRight ?? 0}px ${
			this.radius?.bottomRight ?? 0
		}px ${this.radius?.bottomLeft ?? 0}px`;
	};
}
