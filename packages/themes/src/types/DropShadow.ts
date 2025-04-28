import Color from 'color';
import { ThemeColor } from './ThemeColor';

export interface IDropShadow {
	xOffset: number;
	yOffset: number;
	blurRadius: number;
	spreadRadius: number;
	inset: boolean;
	color?: ThemeColor;
}

export class DropShadow {
	private shadows: IDropShadow[];

	constructor(shadow: IDropShadow | IDropShadow[] | string[]) {
		if (Array.isArray(shadow) && typeof shadow[0] === 'object') {
			this.shadows = shadow as IDropShadow[];
		} else if (Array.isArray(shadow)) {
			this.shadows = (shadow as string[]).map((shadow) =>
				this.parseDropShadow(shadow)
			);
		} else {
			this.shadows = [shadow];
		}
	}

	public toCss = (): string => {
		return this.shadows
			.map(
				({ xOffset, yOffset, blurRadius, spreadRadius, inset, color }) =>
					`${
						inset ? 'inset ' : ''
					}${xOffset}px ${yOffset}px ${blurRadius}px ${spreadRadius}px${
						color ? ` ${color}` : ''
					}`
			)
			.join(', ');
	};

	public withTransformedColor = (
		transformer: (color: ThemeColor) => ThemeColor
	): DropShadow => {
		return new DropShadow(
			this.shadows.map((shadow) => ({
				...shadow,
				color: shadow.color && transformer(shadow.color),
			}))
		);
	};

	private parseDropShadow = (shadowString: string): IDropShadow => {
		const [wholeMatch, insetMatch, numbersMatch, colorMatch] =
			this.dropShadowRegex.exec(shadowString.trim()) ?? [];

		if (!wholeMatch) {
			throw new Error(`"${shadowString}" is not a valid box-shadow`);
		}

		const [xOffset, yOffset, blurRadius = 0, spreadRadius = 0] = numbersMatch
			.split(/\s+/)
			.map((match) => {
				const rawNumber = match.replaceAll('px', '').trim();

				const number = parseFloat(rawNumber);

				if (isNaN(number)) {
					throw new Error(`${match} is not a valid value in "${shadowString}"`);
				}

				return number;
			});

		let color: ThemeColor | undefined;
		try {
			color = colorMatch && Color(colorMatch.trim()).rgb().toString();
		} catch {
			throw new Error(`could not parse ${colorMatch} in "${shadowString}"`);
		}

		console.log(yOffset);

		return {
			inset: Boolean(insetMatch),
			xOffset,
			yOffset,
			blurRadius,
			spreadRadius,
			color,
		};
	};

	private get dropShadowRegex() {
		return /^\s*(inset)?\s*((?:-?\s*\d+(?:\.\d)?(?:px)?\s*){2,4})(\s+(?:#(?:[\dA-Fa-f]{3}){1,2}(?:[\dA-Fa-f]{2})?|rgba?\s*\(.+\)|hsl\s*\(.+\)|[a-zA-Z]+))?$/;
	}
}
