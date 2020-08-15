import * as React from 'react'
import { useMemo } from 'react'
import { Marker, OverlayView, useGoogleMap } from '@react-google-maps/api'
import { Pin as PinType } from '../../../types-ts'
import { useCurrentMap } from '../../../providers/CurrentMap'
import { useCurrentViewer } from '../../../providers/CurrentViewer'
import { PinHoverPopup } from './PinHoverPopup'
import { useInspector } from '../ItemInspector'

const { useState } = React

interface PinProps {
	pin: PinType
}

export const Pin = ({ pin }: PinProps) => {
	const googleMap = useGoogleMap()
	const { mode, transitionMode } = useCurrentMap()
	const { viewer } = useCurrentViewer()
	const { inspectItem, item: inspectedItem } = useInspector()

	const [isHovered, setIsHovered] = useState(false)
	const isInspected = useMemo(() => {
		return inspectedItem?.__typename === 'Pin' && inspectedItem?.uid === pin.uid
	}, [inspectedItem, pin])

	const position = {
		lat: pin.lat,
		lng: pin.lng,
	}

	const onMouseOver = () => setIsHovered(true)
	const onMouseOut = () => setIsHovered(false)
	const onMouseClick = () => {
		setIsHovered(false)
		switch (true) {
			case mode.matches('Lesson.DropPin.DropMode'):
				googleMap?.panTo(position)
				transitionMode({
					type: 'enterConnect',
					context: {
						connectToPin: {
							pin,
							position: pin.route && pin.route.isFirst ? 'BEFORE' : 'AFTER',
						},
					},
				})
				break
			default:
				googleMap?.panTo(position)
				inspectItem(pin, position)
				break
		}
	}

	const isClickable = useMemo(() => {
		if (mode.matches('Lesson.DropPin.DropMode.Connect')) return false
		if (mode.matches('')) {
			if (!viewer) return false
			if (pin.owner?.uid !== viewer.uid) return false
			if (pin.route && !pin.route.isFirst && !pin.route.isLast) return false
		}
		return true
	}, [mode, viewer, pin])

	return (
		<Marker
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			onClick={onMouseClick}
			position={position}
			clickable={isClickable}
			opacity={isClickable ? 1 : 0.3}
		>
			<OverlayView
				mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
				position={position}
				getPixelPositionOffset={(width, height) => ({
					x: -(width / 2),
					y: -height + -50,
				})}
			>
				<React.Fragment>
					{isHovered && !isInspected ? <PinHoverPopup pin={pin} /> : <div />}
				</React.Fragment>
			</OverlayView>
		</Marker>
	)
}
