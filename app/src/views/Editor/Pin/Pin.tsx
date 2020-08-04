import * as React from 'react'
import { useMemo } from 'react'
import { Marker, OverlayView } from '@react-google-maps/api'
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
	const { mode, panTo } = useCurrentMap()
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
		if (mode.matches('Lesson.DropPin.DropMode.Drop')) {
			// TODO
			console.log('DROP')
		} else {
			setIsHovered(false)
			panTo(position)
			inspectItem(pin, position)
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
