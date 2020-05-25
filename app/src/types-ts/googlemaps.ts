export type LatLng = google.maps.LatLng
export type LatLngLiteral = google.maps.LatLngLiteral
export type LatLngType = LatLng | LatLngLiteral

import {
	mappedMapEventNames,
	mappedMarkerEventNames,
	mappedPolylineEventNames,
	mappedEventNames,
} from '../utils'

type AllEventNames = Partial<typeof mappedEventNames>

export type NamedEventListeners<EventNames extends AllEventNames> = {
	[K in keyof EventNames]: google.maps.MVCEventHandler<
		google.maps.MVCObject,
		any
	>
}

export type MapEventListeners = NamedEventListeners<typeof mappedMapEventNames>
export type MarkerEventListeners = NamedEventListeners<
	typeof mappedMarkerEventNames
>
export type PolylineEventListeners = NamedEventListeners<
	typeof mappedPolylineEventNames
>
