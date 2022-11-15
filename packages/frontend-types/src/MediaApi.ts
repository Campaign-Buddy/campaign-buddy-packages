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
	thumbnailUrl: string;
	alt?: string;
}

export interface UploadMediaOptions {
	file: File;
}

export interface UploadMediaResult {
	media: Media;
}

export interface ListUploadedMediaOptions {
	limit: number;
	offset: number;
	type?: MediaKind;
}

export interface ListUploadedMediaResult {
	media: Media[];
}

export interface MediaApi {
	uploadMedia: (options: UploadMediaOptions) => Promise<UploadMediaResult>;
	listUploadedMedia: (
		options: ListUploadedMediaOptions
	) => Promise<ListUploadedMediaResult>;
}
