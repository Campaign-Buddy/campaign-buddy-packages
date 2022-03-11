import { MediaKind } from '@campaign-buddy/frontend-types';

export function openFilePicker(
	onFileChosen: (file: File) => void,
	acceptedMediaKinds: MediaKind[] = [MediaKind.Image]
) {
	if (!document || !window) {
		return;
	}

	const existingElement = document.getElementById(
		'campaign-buddy-open-file-picker'
	);
	if (existingElement) {
		document.body.removeChild(existingElement);
	}

	const inputElement = document.createElement('input');
	inputElement.setAttribute('type', 'file');
	inputElement.id = 'campaign-buddy-open-file-picker';
	inputElement.style.display = 'none';

	const acceptedMimeTypes = [];
	for (const kind of acceptedMediaKinds) {
		if (kind === MediaKind.Image) {
			acceptedMimeTypes.push('image/*');
		} else if (kind === MediaKind.Pdf) {
			acceptedMimeTypes.push('application/pdf');
		} else if (kind === MediaKind.Video) {
			acceptedMimeTypes.push('video/*');
		}
	}

	if (acceptedMimeTypes.length > 0) {
		inputElement.accept = acceptedMimeTypes.join(', ');
	}

	document.body.appendChild(inputElement);

	const handleOnChange = () => {
		if (!inputElement) {
			return;
		}

		inputElement.removeEventListener('change', handleOnChange);

		const files = inputElement.files;

		if (!files?.[0]) {
			return;
		}

		const chosenFile = files[0];
		onFileChosen(chosenFile);
	};

	inputElement.addEventListener('change', handleOnChange);
	inputElement.click();
}
