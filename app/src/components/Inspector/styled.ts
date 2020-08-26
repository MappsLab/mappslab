import styled, { css, DefaultTheme } from 'styled-components'
import { Input } from '../Text'

interface InputProps {
	theme: DefaultTheme
	fontSize: string
}

export const StyledInput = styled(Input)`
	${({ theme, fontSize }: InputProps) => css`
		font-size: ${theme.font.size[fontSize] || theme.font.size.p};
		max-width: 100%;
		min-height: 1.3em;
		background-color: inherit;
		cursor: inherit;
		width: 100%;
		background-color: ${theme.color.xLightGray};
	`}
`

interface WrapperProps {
	theme: DefaultTheme
	focused: boolean
}

export const Wrapper = styled.div`
	${({ theme, focused }: WrapperProps) => css`
		margin-bottom: ${theme.layout.spacing.single};
		position: relative;
		background-color: ${focused ? `${theme.color.xLightGray}` : ''};
		cursor: ${focused ? 'initial' : 'pointer'};
		color: ${focused ? theme.color.primary.normal : 'inherit'};
		&:hover {
			background-color: ${theme.color.xLightGray};
		}
	`}
`
