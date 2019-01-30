// @flow
import * as React from 'react'
import type { LatLng } from 'mapp/types'
import type { PinType } from 'Types'
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
	const route: {
		pins: Array<PinType | LatLng>,
	} = {
		uid: '__in-progress__',
		pins: [connectToPin.pin, userLatLng],
	}
	return <Route route={route} active clickable={false} />
}

export default NewRoute
