export enum MediaKind {
	Image = 'image',
	Video = 'video',
	Pdf = 'pdf',
	Other = 'other',
}

export interface Media {
	assetId: string;
	url: string;
	kind: MediaKind;
	alt?: string;
}

export interface MediaApi {
	uploadMedia: (file: File) => Promise<Media>;
	listUploadedMedia: (
		limit: number,
		offset: number,
		type?: MediaKind
	) => Promise<Media[]>;
}
