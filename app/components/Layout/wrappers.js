// @flow
import styled from 'styled-components'

export const Main = styled.main`
	${({ theme }) => `
		${theme.heavyShadow};
		margin: ${theme.layout.spacing.triple} auto;
		width: calc(100% - ${theme.layout.spacing.quadruple});
		padding: ${theme.layout.spacing.double} ${theme.layout.spacing.single};
		border: 1px solid ${theme.colors.lightGray};
		background-color: white;
	`};
`

export const Column = styled.section`
	${({ theme }) => `
		margin: ${theme.layout.spacing.triple} auto;
		max-width: 600px;
		width: 100%;
		padding: ${theme.layout.spacing.double} ${theme.layout.spacing.single};
		border: 1px solid ${theme.colors.lightGray};
	`};
`

export const Centered = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`
