// @flow

import type { MapType } from 'Types/Map'
import type { PinType } from 'Types/Pin'
import type { ViewerType } from 'Types/User'
import type { LatLng, LatLngLiteral } from 'mapp/types'

export type HandlerProps = {
	transition: (string, {}) => void,
	viewer: ViewerType,
	map: MapType,
	googleMap: Object,
	inProgressPin: PinType,
	activePinUid: string,
}
