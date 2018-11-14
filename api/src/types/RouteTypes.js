// @flow

import type { UserType } from 'Types/UserTypes'
import type { MapType } from 'Types/MapTypes'

export type RouteType = {
	uid: string,
	title?: string,
	lat: number,
	lng: number,
	owner?: UserType,
	maps?: Array<MapType>,
}

export type NewRouteData = {
	title?: string,
	addPins?: Array<string>,
	addPin?: string,
}

export type UpdateRouteData = NewRouteData & {
	removePin?: string,
	removepins?: Array<string>,
}
