// @flow
import type { PinType } from 'Types/Pin'
import type { LatLngBounds } from 'mapp/types'
import { getBounds } from 'mapp'

export const getMapBounds = (pins: Array<PinType>): LatLngBounds => {
	const pinLatLngs = pins.map((p) => ({ lat: p.lat, lng: p.lng }))
	return getBounds(pinLatLngs)
}
