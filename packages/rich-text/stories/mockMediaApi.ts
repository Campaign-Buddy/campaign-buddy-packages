import { Media, MediaApi, MediaKind } from '@campaign-buddy/frontend-types';

let id = 0;
export class MockMediaApi implements MediaApi {
	private uploadedMedia: Media[] = [];

	uploadMedia = async (file: File): Promise<Media> => {
		if (file.type.startsWith('image/')) {
			const media = {
				assetId: `asset-${id++}`,
				url: await getBase64(file),
				kind: MediaKind.Image,
			};

			this.uploadedMedia.push(media);
			return media;
		}

		throw new Error(`Unsupported mime type: ${file.type}`);
	};

	listUploadedMedia = (): Promise<Media[]> =>
		Promise.resolve(this.uploadedMedia);
}

// Copied mostly from https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
function getBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			if (typeof reader.result !== 'string') {
				reject({ reason: 'Expected string result', result: reader.result });
				return;
			}

			resolve(reader.result);
		};
		reader.onerror = function (error) {
			reject({ reason: 'Unexpected error', error });
		};
	});
}
