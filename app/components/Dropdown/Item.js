// @flow
import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.button`
	width: 100%;
	display: block;
	margin: ${({ theme }) => theme.layout.spacing.quarter} 0;
`

/**
 * Item
 */
type Props = {
	render: ({ active: boolean }) => React.Node,
	value: any,
	setValue: (any) => () => void,
	active: boolean,
}

const Item = ({ render, value, active, setValue }: Props) => (
	<Wrapper type="button" onClick={setValue(value)}>
		{render && render({ active })}
	</Wrapper>
)

export default Item
