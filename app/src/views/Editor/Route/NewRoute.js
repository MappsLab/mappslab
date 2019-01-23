// @flow
import * as React from 'react'
import type { LatLng } from 'mapp/types'
import type { PinType } from 'Types'
import Route from './Route'

/**
 * NewRoute
 */

type NewRouteProps = {
	connectAfter: PinType,
	userLatLng: LatLng,
}

const NewRoute = ({ connectAfter, userLatLng }: NewRouteProps) => {
	const route: {
		pins: Array<PinType | LatLng>,
	} = {
		uid: '__in-progress__',
		pins: [connectAfter, userLatLng],
	}
	return <Route route={route} active clickable={false} />
}

export default NewRoute
