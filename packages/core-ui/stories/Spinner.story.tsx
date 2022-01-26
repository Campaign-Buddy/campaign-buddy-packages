import React from 'react';
import { Meta } from '@storybook/react';
import styled from 'styled-components';
import { Spinner } from '../src';

const Container = styled.div`
	margin-bottom: 16px;
`;

export default {
	title: 'core-ui/Spinner',
	component: Spinner,
} as Meta;

export const Primary = () => (
	<div>
		<Container>
			<Spinner size={15} />
		</Container>
		<Container>
			<Spinner size={30} />
		</Container>
		<Container>
			<Spinner size={45} />
		</Container>
	</div>
);
