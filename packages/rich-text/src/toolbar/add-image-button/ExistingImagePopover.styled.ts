import styled from 'styled-components';

export const PopoverContentContainer = styled.div`
	width: 300px;
	max-width: 100%;
`;

export const MediaContainer = styled.div`
	margin: 8px 0;
	display: flex;
	flex-direction: column;
	gap: 8px;
	max-height: 300px;
	overflow-y: auto;

	p {
		text-align: center;
	}

	img {
		object-fit: contain;
		width: 100%;
		max-height: 300px;
		padding: 0 4px;
		border-radius: 8px;
	}
`;
