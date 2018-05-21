// @flow
import React from 'react'
import styled from 'styled-components'
import type { PinType } from 'App/types'
import { ListItem, Column } from 'App/components/Layout'
import { spacing } from 'App/styles/layout'

const PinsListWrapper = styled.aside`
	position: absolute;
	top: 0;
	left: 0;
	max-height: 100%;
	overflow-y: scroll;
	padding: ${spacing.double};
`

/**
 * PinsList
 */

type Props = {
	pins: Array<PinType>,
}

const PinsList = ({ pins }: Props) => {
	console.log(pins)
	return null
	return (
		<PinsListWrapper>
			<Column>{pins.map((pin) => <ListItem title={pin.title} line1={`${pin.lat}, ${pin.lang}`} />)}</Column>
		</PinsListWrapper>
	)
}

export default PinsList
