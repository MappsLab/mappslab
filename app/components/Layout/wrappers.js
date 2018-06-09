// @flow
import styled from 'styled-components'
import { boxStyles, spacing } from 'App/styles/layout'
import { lightGray } from 'App/styles/colors'

export const Main = styled.main`
	margin: ${spacing.triple} auto;
	width: calc(100% - ${spacing.quadruple});
	padding: ${spacing.double} ${spacing.single};
	border: 1px solid ${lightGray};
	${boxStyles};
`

export const Column = styled.section`
	margin: ${spacing.triple} auto;
	max-width: 600px;
	width: 100%;
	padding: ${spacing.double} ${spacing.single};
	border: 1px solid ${lightGray};
	${boxStyles};
`
