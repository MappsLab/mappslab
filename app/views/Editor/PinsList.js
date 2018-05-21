// @flow
import React from 'react'
import styled from 'styled-components'
import type { PinType } from 'App/types'
import { Header2 } from 'App/components/Text'
import { spacing, boxStyles } from 'App/styles/layout'
import { middleGray } from 'App/styles/colors'

/**
 * PinListItem
 */

const PinListItemWrapper = styled.aside`
	margin-bottom: ${spacing.single};
	> span {
		color: ${middleGray};
	}
`

type PinListProps = {
	pin: PinType,
}

const PinListItem = ({ pin }: PinListProps) => (
	<PinListItemWrapper>
		<p>{pin.title}</p>
		<h4>
			{pin.lat}, {pin.lang}
		</h4>
	</PinListItemWrapper>
)

/**
 * PinsList
 */

const PinsListWrapper = styled.aside`
	position: absolute;
	z-index: 100;
	top: ${spacing.single};
	left: ${spacing.single};
	max-height: calc(100% - ${spacing.double});
	overflow-y: scroll;
	padding: ${spacing.single};
	${boxStyles};
`

type Props = {
	pins: Array<PinType>,
}

const PinsList = ({ pins }: Props) => {
	return (
		<PinsListWrapper>
			<Header2>Your Pins</Header2>
			{pins.map((pin) => <PinListItem pin={pin} />)}
		</PinsListWrapper>
	)
}

export default PinsList
