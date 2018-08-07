// @flow

import type { ViewerType, MapType, PinType } from 'Types'

export type HandlerProps = {
	transition: (string, {}) => void,
	viewer: ViewerType,
	map: MapType,
	googleMap: Object,
	inProgressPin: PinType,
	activePinUid: string,
}
