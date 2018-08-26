// @flow
import styled from 'styled-components'

export const Main = styled.main`
	${({ theme }) => `
		${theme.heavyShadow};
		margin: ${theme.spacing.triple} auto;
		width: calc(100% - ${theme.spacing.quadruple});
		padding: ${theme.spacing.double} ${theme.spacing.single};
		border: 1px solid ${theme.colors.lightGray};
	`};
`

export const Column = styled.section`
	${({ theme }) => `
		margin: ${theme.spacing.triple} auto;
		max-width: 600px;
		width: 100%;
		padding: ${theme.spacing.double} ${theme.spacing.single};
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
