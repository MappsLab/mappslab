import * as React from 'react'
import { LatLng } from 'mapp'
import { Pin, Route as RouteType } from 'Types'
import Route from './Route'

/**
 * NewRoute
 */

type NewRouteProps = {
	connectToPin: {
		pin: Pin
		position?: 'BEFORE' | 'AFTER'
	}
	userLatLng: LatLng
}

const NewRoute = ({ connectToPin, userLatLng }: NewRouteProps) => {
	const inProgressPin = {
		...userLatLng,
		__typename: 'Pin',
		uid: '__in-progress-pin__',
	}
	const route = {
		__typename: 'Route',
		uid: '__in-progress-route__',
		pins: [connectToPin.pin, inProgressPin],
	}
	return <Route route={route} />
}

export default NewRoute
