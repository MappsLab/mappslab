import * as React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'

interface DotProps {
	theme: DefaultTheme
	enabled: boolean
}

export const Dot = styled.div`
	${({ theme, enabled }: DotProps) => css`
		width: 16px;
		height: 16px;
		margin-right: 5px;
		border: 2px solid ${theme.color.primary.accent};
		border-radius: 10px;
		background-color: ${enabled
			? theme.color.primary.normal
			: theme.color.primary.muted};
	`}
`
