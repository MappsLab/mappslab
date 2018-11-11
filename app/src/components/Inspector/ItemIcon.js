// @flow
import * as React from 'react'
import styled from 'styled-components'

const IconSpan = styled.span`
	margin: 0 0.2em;
`

/**
 * ItemIcon
 */

const ItemIcon = ({ type }: { type: string }) => {
	const emoji = type === 'user' ? '👤' : type === 'map' ? '🗺' : type === 'classroom' ? '🎓' : '❓'
	return (
		<IconSpan role="img" aria-label={type}>
			{emoji}
		</IconSpan>
	)
}
export default ItemIcon
