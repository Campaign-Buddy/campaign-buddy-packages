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

	public get top() {
		return this.thickness.top;
	}

	public get bottom() {
		return this.thickness.bottom;
	}

	public get left() {
		return this.thickness.left;
	}

	public get right() {
		return this.thickness.right;
	}

	public get vertical() {
		return this.thickness.top + this.thickness.bottom;
	}

	public get horizontal() {
		return this.thickness.right + this.thickness.left;
	}

	public toCss(): string {
		return `${this.thickness.top}px ${this.thickness.right}px ${this.thickness.bottom}px ${this.thickness.left}px`;
	}

	private parseThickness(value: string): IThickness {
		const splitValue = value.split(' ').filter((x) => x);
		const topRaw = splitValue[0] ?? '0';
		const rightRaw = splitValue[1] ?? topRaw;
		const bottomRaw = splitValue[2] ?? topRaw;
		const leftRaw = splitValue[3] ?? rightRaw;

		const parsed = [topRaw, rightRaw, bottomRaw, leftRaw].map((x) =>
			parseInt(x)
		);
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
