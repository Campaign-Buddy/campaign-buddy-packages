import { Media, MediaApi, MediaKind } from '@campaign-buddy/frontend-types';

function sleep(timeout: number) {
	return new Promise<void>((resolve) => setTimeout(() => resolve(), timeout));
}

let id = 0;
export class MockMediaApi implements MediaApi {
	private uploadedMedia: Media[] = [];

	constructor() {
		this.uploadedMedia = this.generateMedias(30);
	}

	uploadMedia = async (file: File): Promise<Media> => {
		if (file.type.startsWith('image/')) {
			const url = await getBase64(file);
			const media = {
				assetId: `asset-${id++}`,
				url,
				kind: MediaKind.Image,
				thumbnailUrl: url,
			};

			this.uploadedMedia.push(media);
			return media;
		}

		throw new Error(`Unsupported mime type: ${file.type}`);
	};

	listUploadedMedia = async (
		limit: number,
		offset: number,
		type?: MediaKind
	): Promise<Media[]> => {
		if (type !== MediaKind.Image) {
			return [];
		}

		await sleep(1000);
		return Promise.resolve(this.uploadedMedia.slice(offset, offset + limit));
	};

	private generateMedias = (count: number): Media[] =>
		Array(count)
			.fill(0)
			.map((_, i) => {
				const seed = Math.random().toString().substring(2);
				const width = this.randomInt(10, 30) * 10;
				const height = this.randomInt(10, 30) * 10;

				return {
					url: `https://picsum.photos/seed/${seed}/${width * 10}/${
						height * 10
					}`,
					assetId: `picsum-${i}`,
					thumbnailUrl: `https://picsum.photos/${width}/${height}`,
					kind: MediaKind.Image,
					alt: `Random picsum with seed = ${seed}`,
				};
			});

	private randomInt = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
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
