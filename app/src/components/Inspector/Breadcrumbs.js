// @flow
import * as React from 'react'
import { Button } from 'Components/UI'
import type { InspectorItem } from './InspectorProvider'

/**
 * Breadcrumbs
 */

type Props = {
	goBackTo: (InspectorItem) => void,
	inspectorHistory: Array<InspectorItem>,
}

const IconByType = ({ type }: { type: string }) => {
	const emoji = type === 'user' ? '👤' : type === 'map' ? '🗺' : type === 'classroom' ? '🎓' : '❓'
	return (
		<span role="img" aria-label={type}>
			{emoji}
		</span>
	)
}

const Breadcrumbs = (props: Props) => {
	const { goBackTo, inspectorHistory } = props
	console.log('crumbs', props)
	if (inspectorHistory.length < 2) return null
	const previousItem = inspectorHistory[inspectorHistory.length - 2]

	const goBackToItem = (item: InspectorItem) => () => {
		goBackTo(item)
	}

	return (
		<Button onClick={goBackToItem(previousItem)} level="tertiary">
			← <IconByType type={previousItem.type} /> {previousItem.title}
		</Button>
	)
}

export default Breadcrumbs
