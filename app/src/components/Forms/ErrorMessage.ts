import styled from 'styled-components'
import { P } from '../Text'

export const ErrorMessage = styled(P)`
	${({ theme }) => `
		color: ${theme.color.error};
	`}
`
