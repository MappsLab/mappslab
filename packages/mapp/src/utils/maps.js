// @flow

import type { LatLng, LatLngLiteral, LatLngBoundsLiteral } from '../types/latLngTypes'

const getMinMax = (numbers: Array<number>): [number, number] => {
	console.log(numbers)
	return [Math.min(...numbers), Math.max(...numbers)]
}

export const getBounds = (latLngs: Array<LatLng | LatLngLiteral>): LatLngBoundsLiteral => {
	const [minLat, maxLat] = getMinMax(latLngs.map((latLng) => latLng.lat))
	const [minLng, maxLng] = getMinMax(latLngs.map((latLng) => latLng.lng))
	return {
		east: maxLng,
		north: maxLat,
		south: minLat,
		west: minLng,
	}

	// const bounds = latLngs.reduce((acc, current) => ({
	// 	minLat
	// }))
}
