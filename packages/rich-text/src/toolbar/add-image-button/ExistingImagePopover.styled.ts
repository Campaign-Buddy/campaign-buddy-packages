import styled from 'styled-components';

export const PopoverContentContainer = styled.div`
	width: 300px;
	max-width: 100%;
`;

export const MediaContainer = styled.div`
	margin: 8px 0;
	display: flex;
	flex-wrap: wrap;
	max-height: 300px;
	overflow-y: auto;

	p {
		text-align: center;
	}

	img {
		flex: 1 0;
		height: 100px;
		object-fit: contain;
	}
`;
