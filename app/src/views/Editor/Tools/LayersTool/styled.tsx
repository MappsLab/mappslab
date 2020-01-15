import styled, { css } from 'styled-components'

export const LayersToolPane = styled.div`
	${({ theme }) => css`
		z-index: ${theme.layout.z.mapTool};
		position: fixed;
		bottom: 90px;
		right: 20px;
		background-color: white;
		box-shadow: ${theme.mixins.boxShadow.heavy};
		border-radius: 2px;
		border: 1px solid ${theme.color.darkGray};
		padding: ${theme.layout.spacing.half};
		display: flex;
		flex-direction: column;
	`}
`
