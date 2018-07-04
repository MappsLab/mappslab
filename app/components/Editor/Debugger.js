// @flow
import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	position: absolute;
	top: 10px;
	left: 10px;
	background: white;
	width: 200px;
	z-index: 100;
	padding: 5px;
`

const PropertyWrapper = styled.h4``

const Title = styled.span`
	font-weight: 800;
`

const Value = styled.span`
	color: ${({ isBoolean }) => (isBoolean ? 'tomato' : 'auto')};
`

const Property = ({ title, value }: { title: string, value: string }): React.Node => (
	<PropertyWrapper>
		<Title>{title}</Title>: <Value isBoolean={typeof value === 'boolean'}>{value.toString()}</Value>
	</PropertyWrapper>
)

/**
 * Debugger
 */

type Props = {
	mode: string,
}

const Debugger = ({ mode }: Props) => (
	<Wrapper>
		<Property title="mode" value={mode} />
	</Wrapper>
)

Debugger.defaultProps = {
	mode: '',
}

export default Debugger
