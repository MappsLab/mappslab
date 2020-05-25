import * as React from 'react'
import { Pin, Route as RouteType, LatLngType } from '../../../types-ts'
import { Route } from './Route'

/**
 * NewRoute
 */

type NewRouteProps = {
	connectToPin: {
		pin: Pin
		position?: 'BEFORE' | 'AFTER'
	}
	userLatLng: LatLngType
}

export const NewRoute = ({ connectToPin, userLatLng }: NewRouteProps) => {
	const inProgressPin = {
		...userLatLng,
		__typename: 'Pin',
		uid: '__in-progress-pin__',
	}
	const route = {
		__typename: 'Route' as 'Route',
		uid: '__in-progress-route__',
		pins: [connectToPin.pin, inProgressPin],
	}
	// @ts-ignore
	return <Route route={route} />
}

