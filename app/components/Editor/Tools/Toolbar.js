// @flow
import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	position: absolute;
	z-index: 100;
	bottom: 20px;
	display: flex;
	${({ align }) => {
		switch (align) {
			case 'left':
				return `
					left: 20px;
					justify-content: flex-start;
				`
			case 'right':
				return `
					right: 20px;
					justify-content: flex-end;
				`
			default:
				return `
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
	children: React.Node,
	align?: 'left' | 'center' | 'right',
}

const Toolbar = ({ children, align }: Props) => <Wrapper align={align}>{children}</Wrapper>

Toolbar.defaultProps = {
	align: 'center',
}

export default Toolbar
