import { Classes, Overlay } from '@blueprintjs/core';
import React, { SyntheticEvent, useCallback } from 'react';
import { Button, ButtonStyle } from '../button';
import {
	OverlayBackground,
	ModalRoot,
	ModalContent,
	ModalFooter,
	ModalTitle,
	ScrollStyle,
} from './Modal.styled';

interface ModalButton {
	text: string;
	onClick: () => void;
	style?: ButtonStyle;
}

interface ModalProps {
	title: string;
	onClose: () => void;
	isOpen: boolean;
	footerButtons: ModalButton[];
	scrollStyle?: ScrollStyle;
}

export const Modal: React.FC<ModalProps> = ({
	title,
	onClose,
	isOpen,
	footerButtons,
	scrollStyle,
	children,
}) => {
	const captureClick = useCallback((e: SyntheticEvent) => {
		e.stopPropagation();
	}, []);

	return (
		<Overlay isOpen={isOpen} onClose={onClose}>
			<OverlayBackground
				onClick={onClose}
				scrollStyle={scrollStyle ?? 'content'}
			>
				<ModalRoot
					className={Classes.ELEVATION_3}
					onClick={captureClick}
					scrollStyle={scrollStyle ?? 'content'}
				>
					<ModalTitle>
						<h1>{title}</h1>
						<Button icon="cross" onClick={onClose} style="minimal" />
					</ModalTitle>
					<ModalContent scrollStyle={scrollStyle ?? 'content'}>
						{children}
					</ModalContent>
					<ModalFooter>
						{footerButtons.map((button) => (
							<Button
								key={button.text}
								style={button.style}
								onClick={button.onClick}
							>
								{button.text}
							</Button>
						))}
					</ModalFooter>
				</ModalRoot>
			</OverlayBackground>
		</Overlay>
	);
};
