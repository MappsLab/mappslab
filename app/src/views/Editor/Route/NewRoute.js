// @flow
import * as React from 'react'
import type { LatLng } from 'mapp/types'
import type { PinType } from 'Types/Pin'
import Route from './Route'

/**
 * NewRoute
 */

type NewRouteProps = {
	connectToPin: {
		pin: PinType,
		position?: 'BEFORE' | 'AFTER',
	},
	userLatLng: LatLng,
}

const NewRoute = ({ connectToPin, userLatLng }: NewRouteProps) => {
	const inProgressPin = {
		...userLatLng,
		__typename: 'Pin',
		uid: '__in-progress-pin__',
	}
	const route: {
		pins: Array<PinType | LatLng>,
	} = {
		__typename: 'Route',
		uid: '__in-progress-route__',
		pins: [connectToPin.pin, inProgressPin],
	}
	return <Route route={route} active clickable={false} />
}

export default NewRoute
