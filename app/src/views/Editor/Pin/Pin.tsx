import * as React from 'react'
import { Marker, InfoWindow } from '@react-google-maps/api'
import { Pin as PinType } from '../../../types-ts'
import { useCurrentMap } from '../../../providers/CurrentMap'

const { useState } = React

interface PinProps {
	pin: PinType
}

export const Pin = ({ pin }: PinProps) => {
	const { inspectedItem, setInspectedItem } = useCurrentMap()
	const [isHovered, setIsHovered] = useState(false)
	const isInspected =
		inspectedItem?.__typename === 'Pin' && inspectedItem?.uid === pin.uid

	const onMouseOver = () => setIsHovered(true)
	const onMouseOut = () => setIsHovered(false)
	const markerEvents = {
		onMouseOver,
		onMouseOut,
	}
	const position = {
		lat: pin.lat,
		lng: pin.lng,
	}

	// TODO: Events
	// TODO: Custom Popup on Hover

	return (
		<Marker
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			position={position}
		/>
	)
}
