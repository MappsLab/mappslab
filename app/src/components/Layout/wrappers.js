// @flow
import styled from 'styled-components'

export const Main = styled.main`
	${({ theme }) => `
		${theme.heavyShadow};
		margin: ${theme.layout.spacing.triple} auto;
		width: calc(100% - ${theme.layout.spacing.quadruple});
		padding: ${theme.layout.spacing.double} ${theme.layout.spacing.single};
		border: 1px solid ${theme.color.lightGray};
		background-color: white;
	`};
`

export const Column = styled.section`
	${({ theme, size }) => `
		margin: ${size === 'narrow' ? theme.layout.spacing.half : theme.layout.spacing.double} auto;
		padding: 0 ${theme.layout.spacing.single};
		max-width: ${theme.sizes.column[size] || theme.sizes.column.medium};
		width: 100%;
	`};
`

export const Centered = styled.div`
	${({ theme }) => `
		position: relative;
		z-index: ${theme.layout.z.modal};
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	`};
`
