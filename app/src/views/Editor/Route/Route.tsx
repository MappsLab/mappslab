import React, { useMemo, useState } from 'react'
import { OverlayView, Polyline, useGoogleMap } from '@react-google-maps/api'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
	Route as RouteType,
	Pin,
	LatLngLiteral,
	LatLngType,
} from '../../../types-ts'
import { RouteHoverPopup } from './RouteHoverPopup'
import { useInspector } from '../ItemInspector'

interface RouteProps {
	route: RouteType
	active?: boolean
	clickable?: boolean
}

const getPathFromPins = (pins: Array<Pin | LatLngType>): LatLngLiteral[] =>
	pins.map(({ lat, lng }) => ({
		lat: typeof lat === 'function' ? lat() : lat,
		lng: typeof lng === 'function' ? lng() : lng,
	}))

export const Route = ({ route, active, clickable }: RouteProps) => {
	const googleMap = useGoogleMap()
	const [isHovered, setIsHovered] = useState(false)
	const { inspectItem, item: inspectedItem } = useInspector()
	const [mouseLatLng, setMouseLatLng] = useState({
		lat: 0,
		lng: 0,
	})

	const isInspected = useMemo(() => {
		return (
			inspectedItem?.__typename === 'Route' && inspectedItem?.uid === route.uid
		)
	}, [inspectedItem, route])

	const onMouseOver = (e: google.maps.MouseEvent) => {
		setIsHovered(true)
		setMouseLatLng({
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		})
	}
	const onMouseMove = (e: google.maps.MouseEvent) => {
		setMouseLatLng({
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		})
	}
	const onMouseOut = () => setIsHovered(false)
	const onClick = (e: google.maps.MouseEvent) => {
		const position = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		}
		googleMap?.panTo(position)
		inspectItem(route, position)
	}

	const [pins] = unwindEdges(route.pins)
	const path = useMemo(() => getPathFromPins(pins), [pins])

	return (
		<React.Fragment>
			{isHovered && (
				<OverlayView
					mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
					position={mouseLatLng}
					getPixelPositionOffset={(width, height) => ({
						x: -(width / 2),
						y: -height + -10,
					})}
				>
					<RouteHoverPopup position={mouseLatLng} route={route} />
				</OverlayView>
			)}
			<Polyline
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut}
				onMouseMove={onMouseMove}
				onClick={onClick}
				options={{
					path,
					strokeColor: route.color || '#F44336',
					strokeOpacity: active || isHovered ? 1 : 0.8,
					strokeWeight: active || isHovered ? 8 : 5,
					clickable: clickable,
				}}
			/>
		</React.Fragment>
	)
}
