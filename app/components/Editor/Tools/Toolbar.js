// @flow
import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	position: absolute;
	z-index: 100;
	bottom: 20px;
	width: 400px;
	left: calc(50% - 200px);
	display: flex;
	justify-content: center;
`

/**
 * Toolbar
 */

type Props = {
	children: React.Node,
}

const Toolbar = ({ children }: Props) => <Wrapper>{children}</Wrapper>

export default Toolbar
