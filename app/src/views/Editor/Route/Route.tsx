import * as React from 'react'
import { Polyline } from '@react-google-maps/api'
import { StateValue } from 'xstate'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
	Route as RouteType,
	Pin,
	LatLngLiteral,
	LatLngType,
} from '../../../types-ts'
import { useCurrentMap } from '../../../providers/CurrentMap'
import { RouteHoverPopup } from './RouteHoverPopup'

const { useEffect } = React

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
	const { mapMode, setInspectedItem } = useCurrentMap()
	useEffect(() => {
		console.log('TODO: Route events')
		// TODO:
		// set mouseHover, mouseLatLng, others
	}, [])
	const mouseOver = false
	const mouseLatLng = {
		lat: 0,
		lng: 0,
	}

	const [pins] = unwindEdges(route.pins)
	const path = getPathFromPins(pins)
	const options = {
		path,
		strokeColor: 'hsl(5, 94%, 60%)',
		strokeOpacity: active || mouseOver ? 0.8 : 0.3,
		strokeWeight: active || mouseOver ? 6 : 4,
		clickable: false,
	}
	return (
		<>
			{mouseOver && mouseLatLng ? (
				<RouteHoverPopup position={mouseLatLng} route={route} />
			) : null}
			<Polyline options={options} />
		</>
	)
}
