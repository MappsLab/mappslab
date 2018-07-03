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

export type NewPinArgs = {
	title: string,
	lat: number,
	lang: number,
	mapUids?: Array<string>,
	lessonUids?: Array<string>,
}

export type NewPinInput = {
	input: NewPinArgs,
}
