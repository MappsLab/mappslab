import * as React from 'react'
import { useEffect, useMemo } from 'react'
import { Marker, OverlayView, useGoogleMap } from '@react-google-maps/api'
import { Pin as PinType } from '../../../types-ts'
import { useCurrentMap } from '../../../providers/CurrentMap'
import { useCurrentViewer } from '../../../providers/CurrentViewer'
import { PinHoverPopup } from './PinHoverPopup'
import { useInspector } from '../ItemInspector'
import { useUpdatePinMutation } from '../../../queries/pin'
import { FaMapMarkerAlt } from 'react-icons/all'

const { useState } = React

interface PinProps {
	pin: PinType
}

export const Pin = ({ pin }: PinProps) => {
	const googleMap = useGoogleMap()
	const { mode, transitionMode, mapUid } = useCurrentMap()
	const { viewer } = useCurrentViewer()
	const { inspectItem, item: inspectedItem } = useInspector()
	const [updatePin] = useUpdatePinMutation({ mapUid: mapUid || '' })

	const [isHovered, setIsHovered] = useState(false)
	const [isDragging, setIsDragging] = useState(false)
	const isInspected = useMemo(() => {
		return inspectedItem?.__typename === 'Pin' && inspectedItem?.uid === pin.uid
	}, [inspectedItem, pin])

	const [position, setPosition] = useState({
		lat: pin.lat,
		lng: pin.lng,
	})
	useEffect(() => {
		setPosition({
			lat: pin.lat,
			lng: pin.lng,
		})
	}, [pin.lat, pin.lng])

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

	const onDragStart = () => {
		setIsDragging(true)
	}

	const onDragEnd = async (e: google.maps.MouseEvent) => {
		await updatePin({
			variables: {
				uid: pin.uid,
				lat: e.latLng.lat(),
				lng: e.latLng.lng(),
			},
		})
		setPosition({
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		})
		setIsDragging(false)
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

	const isDraggable = Boolean(
		viewer && pin && pin.owner && viewer.uid === pin.owner.uid,
	)

	return (
		<Marker
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			onClick={onMouseClick}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			position={position}
			clickable={isClickable}
			opacity={isClickable ? 1 : 0.3}
			draggable={isDraggable}
			icon={{
				path:
					'M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z',
				fillColor: pin.color || '#F44336',
				fillOpacity: 1,
				scale: 0.075,
				anchor: new google.maps.Point(384 / 2, 512),
			}}
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
					{isHovered && !isDragging && !isInspected ? (
						<PinHoverPopup pin={pin} />
					) : (
						<div />
					)}
				</React.Fragment>
			</OverlayView>
		</Marker>
	)
}
