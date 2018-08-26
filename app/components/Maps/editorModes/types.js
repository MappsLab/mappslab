// @flow

import type { MapType } from 'Types/Map'
import type { PinType } from 'Types/Pin'
import type { ViewerType } from 'Types/User'
import type { LatLng, LatLngLiteral } from 'mapp/types'

type EditorUtils = {
	latLngWithPixelOffset: (LatLng | LatLngLiteral, number, number) => LatLng,
}

export type HandlerProps = {
	transition: (string, {}) => void,
	viewer: ViewerType,
	map: MapType,
	googleMap: Object,
	inProgressPin: PinType,
	activePinUid: string,
	utils: EditorUtils,
}
