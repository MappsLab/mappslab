// @flow

import type { UserType } from '../User/UserTypes'
import type { MapType } from '../Map/MapTypes'
import type { RouteType } from '../Route/RouteTypes'

export type GetPinArgs = {
	uid: string,
}

export type PinType = {
	uid: string,
	title?: string,
	lat: number,
	lang: number,
	owner?: UserType,
	maps?: Array<MapType>,
	routes?: Array<RouteType>,
}

export type PinInput = {
	title?: string,
	lat?: number,
	lang?: number,
}
