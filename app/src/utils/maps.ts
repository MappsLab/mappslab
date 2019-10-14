import { Pin } from '../types-ts'
import { unwindEdges } from '@good-idea/unwind-edges'
import { GeoPosition } from 'geo-position.ts'
// import { LatLngBounds } from 'googlemaps'
import { getBounds } from 'mapp'
import { Route } from '../types-ts'
import { metersToMiles } from '@ericgio/distance-utils'

interface LatLng {
	lat: number
	lng: number
}

export const getMapBounds = (pins: Pin[]) => {
	const pinLatLngs = pins.map((p) => ({ lat: p.lat, lng: p.lng }))
	return getBounds(pinLatLngs)
}

export const pinsToLatLngs = (pins: Pin[]) =>
	pins.map(({ lat, lng }) => ({
		lat,
		lng,
	}))

const R = 3956 // radius of the earth in miles

type Pair<T> = T[]

// Pair an array of items,
// i.e. [a, b, c, d] => [[a, b], [b, c], [c, d]]
const groupPairs = <T>(arr: T[]): Array<Pair<T>> =>
	arr
		.reduce<Array<Pair<T>>>((pairs, second) => {
			const lastPair = pairs[pairs.length - 1]
			const first = lastPair ? lastPair[0] : undefined

			const firstSet = lastPair ? [lastPair[0], second] : undefined
			const nextSet = [second]

			return firstSet ? [...pairs.slice(0, pairs.length - 1), firstSet, nextSet] : [...pairs.slice(0, pairs.length - 1), nextSet]
		}, [])
		.filter((pair: Pair<T>) => pair.length === 2)

export const getDistance = (latLngs: LatLng[]): number =>
	groupPairs(latLngs).reduce((distance, latLng) => {
		const x = new GeoPosition(latLng[0].lat, latLng[0].lng)
		const y = new GeoPosition(latLng[1].lat, latLng[1].lng)
		return distance + x.Distance(y)
	}, 0)

export const getRouteDistance = (route: Route): number => {
	if (!route.pins) return 0
	const [pins] = unwindEdges(route.pins)
	if (!pins || pins.length < 2) return 0
	return metersToMiles(getDistance(pinsToLatLngs(pins)), 2)
}

