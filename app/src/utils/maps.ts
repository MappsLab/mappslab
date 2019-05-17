import { Pin } from '../types-ts'
// import { LatLngBounds } from 'googlemaps'
import { getBounds } from 'mapp'

export const getMapBounds = (pins: Pin[]) => {
	const pinLatLngs = pins.map((p) => ({ lat: p.lat, lng: p.lng }))
	return getBounds(pinLatLngs)
}
