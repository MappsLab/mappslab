// @flow

import type { UserType } from 'Types/UserTypes'
import type { MapType } from 'Types/MapTypes'
import type { PinType } from 'Types/PinTypes'

export type RouteType = {
	uid: string,
	title?: string,
	owner: UserType,
	maps?: Array<MapType>,
	pins: Array<?PinType>,
}

export type GetRouteArgs = {
	uid: string,
}

export type NewRouteData = {
	title?: string,
	pins: Array<string>,
}

export type UpdateRouteData = NewRouteData & {
	removePin?: string,
	removepins?: Array<string>,
}
