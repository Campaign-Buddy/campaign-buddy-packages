export enum MediaKind {
	Image = 'image',
	Video = 'video',
	Pdf = 'pdf',
}

export interface Media {
	assetId: string;
	url: string;
	kind: MediaKind;
}

export interface MediaApi {
	uploadMedia: (file: File, type?: MediaKind) => Promise<Media>;
	getUploadedMedia: (
		limit: number,
		offset: number,
		type?: MediaKind
	) => Promise<Media[]>;
}
