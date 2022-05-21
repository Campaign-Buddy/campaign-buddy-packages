export type ThemeColor = string;

interface IBorderRadius {
	topLeft?: number;
	topRight?: number;
	bottomRight?: number;
	bottomLeft?: number;
}

export class BorderRadius {
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

	public toCss(): string {
		return `${this.radius?.topLeft ?? 0} ${this.radius?.topRight ?? 0} ${
			this.radius?.bottomRight ?? 0
		} ${this.radius?.bottomLeft ?? 0}`;
	}
}

interface IThickness {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

export class Thickness {
	private thickness: IThickness;

	constructor(value: number | string | IThickness) {
		if (typeof value === 'string') {
			this.thickness = this.parseThickness(value);
		} else if (typeof value === 'number') {
			this.thickness = {
				top: value,
				right: value,
				bottom: value,
				left: value,
			};
		} else {
			this.thickness = value;
		}
	}

	public toCss(): string {
		return `${this.thickness.top} ${this.thickness.right} ${this.thickness.bottom} ${this.thickness.left}`;
	}

	private parseThickness(value: string): IThickness {
		const splitValue = value.split(' ').filter((x) => x);
		const topRaw = splitValue[0] ?? '0';
		const rightRaw = splitValue[1] ?? topRaw;
		const bottomRaw = splitValue[2] ?? topRaw;
		const leftRaw = splitValue[3] ?? rightRaw;

		const parsed = [topRaw, rightRaw, bottomRaw, leftRaw].map(parseInt);
		if (parsed.some(isNaN)) {
			return { top: 0, bottom: 0, left: 0, right: 0 };
		}

		return {
			top: parsed[0],
			right: parsed[1],
			bottom: parsed[2],
			left: parsed[3],
		};
	}
}