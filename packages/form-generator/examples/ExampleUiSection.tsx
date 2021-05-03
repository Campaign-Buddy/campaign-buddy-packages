import React from 'react';
import styled from 'styled-components';
import { UiSectionProps } from '../src';

const Header = styled.div`
	display: flex;
`;

const Container = styled.div<{ isOpen: boolean }>`
	width: 100%;
	${({ isOpen }) => !isOpen && `margin-bottom: 8px;`}
`

const Content = styled.div`
	width: 100%;
`;

export const ExampleUiSection: React.FC<UiSectionProps> = ({
	isCollapsible,
	isOpen,
	toggleIsOpen,
	title,
	children,
}) => (
	<Container isOpen={isOpen}>
		<Header><h2>{title}</h2>{isCollapsible && <button onClick={toggleIsOpen}>toggle</button>}</Header>
		<Content>
			{isOpen && children}
		</Content>
	</Container>
)
