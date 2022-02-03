export interface Image {
	url: string;
	alt: string;
}

export interface ImageDimensions {
	width: number;
	height: number;
}

export type ImageWithDimensions = Image & ImageDimensions;
