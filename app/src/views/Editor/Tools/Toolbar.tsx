import * as React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'

interface WrapperProps {
	theme: DefaultTheme
	align: string
}

const Wrapper = styled.div`
	${({ theme }: WrapperProps) => css`
		position: absolute;
		z-index: ${theme.layout.z.mapTool};
		bottom: ${theme.layout.spacing.double};
		display: flex;
		pointer-events: none;

		> * {
			pointer-events: initial;
		}
	`}
	${({ align }: WrapperProps) => {
		switch (align) {
			case 'left':
				return css`
					justify-content: flex-start;
					left: 20px;
				`
			case 'right':
				return css`
					justify-content: flex-end;
					right: 20px;
				`
			default:
				return css`
					width: 400px;
					left: calc(50% - 200px);
					justify-content: center;
				`
		}
	}};
`

/**
 * Toolbar
 */

type Props = {
	children: React.ReactNode
	align?: 'left' | 'center' | 'right'
}

const Toolbar = ({ children, align }: Props) => (
	<Wrapper align={align || 'center'}>{children}</Wrapper>
)

Toolbar.defaultProps = {
	align: 'center',
}

export default Toolbar
