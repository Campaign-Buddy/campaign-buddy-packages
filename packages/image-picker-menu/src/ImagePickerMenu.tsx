import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Media, MediaApi } from '@campaign-buddy/frontend-types';
import { useBooleanState } from '@campaign-buddy/common-hooks';
import { MenuItem, MenuPopover } from '@campaign-buddy/core-ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { openFilePicker } from './openFilePicker';
import { ExistingImagePicker } from './ExistingImagePicker';
import { ExternalUrlPicker } from './ExternalUrlPicker';

type ImagePickerKind = 'existing-media' | 'file-upload' | 'url';

export type OpenPopoverState = 'main-menu' | ImagePickerKind | 'none';

const defaultSupportedOptions: ImagePickerKind[] = [
	'existing-media',
	'file-upload',
	'url',
];

export interface ImagePickerMenuProps {
	isOpen: boolean;
	onConfirm: (url: string, media?: Media) => void;
	onClose: () => void;
	mediaApi: MediaApi;
	queryClient: QueryClient;
	supportedOptions?: ImagePickerKind[];
	onStateTransition?: (
		previousState: OpenPopoverState,
		currentState: OpenPopoverState
	) => void;
}

export const ImagePickerMenu: React.FC<
	React.PropsWithChildren<ImagePickerMenuProps>
> = ({
	isOpen,
	onConfirm,
	onClose,
	mediaApi,
	queryClient,
	supportedOptions = defaultSupportedOptions,
	children,
	onStateTransition,
}) => {
	const onStateTransitionRef = useRef(onStateTransition);
	useEffect(() => {
		onStateTransitionRef.current = onStateTransition;
	}, [onStateTransition]);

	const [openPickerKind, setOpenPickerKind] =
		useState<OpenPopoverState>('none');
	const [isMenuOpen, openMenu, closeMenu] = useBooleanState(isOpen);

	const openPopoverState = useMemo(() => {
		if (isMenuOpen) {
			return 'main-menu';
		}

		return openPickerKind;
	}, [isMenuOpen, openPickerKind]);
	const openPopoverStateRef = useRef(openPopoverState);
	const previousOpenPopoverState = useRef<OpenPopoverState>(openPopoverState);

	useEffect(() => {
		openPopoverStateRef.current = openPopoverState;

		return () => {
			previousOpenPopoverState.current = openPopoverState;
		};
	}, [openPopoverState]);

	const closeAllPickers = useCallback(() => {
		setOpenPickerKind('none');
	}, []);

	const openExistingMediaPicker = useCallback(() => {
		setOpenPickerKind('existing-media');
		closeMenu();
	}, [closeMenu]);

	const openUrlPicker = useCallback(() => {
		setOpenPickerKind('url');
		closeMenu();
	}, [closeMenu]);

	const uploadImage = useCallback(() => {
		setOpenPickerKind('file-upload');
		closeMenu();
		openFilePicker(async (file) => {
			const result = await mediaApi.uploadMedia(file);
			onConfirm(result.url, result);
		});
	}, [closeMenu, mediaApi, onConfirm]);

	const menuItems = useMemo(
		() =>
			[
				supportedOptions.includes('file-upload') && {
					displayText: 'Upload image',
					icon: 'upload',
					onClick: uploadImage,
					shouldCloseMenuOnClick: false,
				},
				supportedOptions.includes('existing-media') && {
					displayText: 'Use existing image',
					icon: 'cloud-download',
					onClick: openExistingMediaPicker,
					shouldCloseMenuOnClick: false,
				},
				supportedOptions.includes('url') && {
					displayText: 'Use external url',
					icon: 'link',
					onClick: openUrlPicker,
					shouldCloseMenuOnClick: false,
				},
			].filter((x) => Boolean(x)) as MenuItem[],
		[openExistingMediaPicker, openUrlPicker, supportedOptions, uploadImage]
	);

	const onConfirmExistingMedia = useCallback(
		(media: Media) => {
			onConfirm(media.url, media);
		},
		[onConfirm]
	);

	const onConfirmExternalUrl = useCallback(
		(url: string) => {
			onConfirm(url);
		},
		[onConfirm]
	);

	useEffect(() => {
		if (isOpen) {
			if (openPopoverStateRef.current === 'none') {
				openMenu();
				closeAllPickers();
			}
		} else {
			if (openPopoverStateRef.current !== 'none') {
				closeMenu();
				closeAllPickers();
			}
		}
	}, [isOpen, closeMenu, closeAllPickers, openMenu]);

	useEffect(() => {
		// Needed to capture state change from
		// main-menu -> file-upload -> none
		if (openPickerKind === 'file-upload') {
			setOpenPickerKind('none');
		}
	}, [openPickerKind]);

	useEffect(() => {
		const haveAllPopoversClosed =
			openPopoverState === 'none' &&
			previousOpenPopoverState.current !== 'none';

		if (onStateTransitionRef?.current) {
			if (openPopoverState !== previousOpenPopoverState.current) {
				onStateTransitionRef?.current(
					previousOpenPopoverState?.current,
					openPopoverState
				);
			}
		}

		if (haveAllPopoversClosed) {
			onClose();
		}
	}, [onClose, openPopoverState]);

	if (menuItems.length === 0) {
		return <>{children}</>;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<MenuPopover items={menuItems} isOpen={isMenuOpen} onClose={closeMenu}>
				<ExistingImagePicker
					isOpen={!isMenuOpen && openPickerKind === 'existing-media'}
					mediaApi={mediaApi}
					onConfirm={onConfirmExistingMedia}
					onClose={closeAllPickers}
				>
					<ExternalUrlPicker
						isOpen={!isMenuOpen && openPickerKind === 'url'}
						onConfirm={onConfirmExternalUrl}
						onClose={closeAllPickers}
					>
						{children}
					</ExternalUrlPicker>
				</ExistingImagePicker>
			</MenuPopover>
		</QueryClientProvider>
	);
};
