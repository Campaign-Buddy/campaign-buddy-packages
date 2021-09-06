import React from 'react';
import styled from 'styled-components';
import { UiSectionProps } from '../src';

const Header = styled.div`
  display: flex;
`;

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
`;

export const ExampleUiSection: React.FC<UiSectionProps> = ({
	title,
	children,
}) => {
	if (React.Children.count(children) === 0) {
		return null;
	}

	return (
		<Container>
			<Header>
				<h2>{title}</h2>
			</Header>
			<Content>{children}</Content>
		</Container>
	);
};
