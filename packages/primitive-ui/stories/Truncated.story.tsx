import styled from 'styled-components';
import { Meta } from '@storybook/react';
import { Truncated } from '../src';

export default {
	title: 'primitive-ui/Truncated',
	component: Truncated,
} as Meta;

const Container = styled.div`
	resize: horizontal;
	width: 400px;
	max-width: 100%;
	overflow: auto;
`;

export const Primary = () => {
	return (
		<Container>
			<Truncated>
				This is some really long text that should be truncated
			</Truncated>
		</Container>
	);
};
