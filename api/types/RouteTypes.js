// @flow

import type { UserType } from 'Types/UserTypes'
import type { MapType } from 'Types/MapTypes'

export type RouteType = {
	uid: string,
	title?: string,
	lat: number,
	lang: number,
	owner?: UserType,
	maps?: Array<MapType>,
}

export type RouteInput = {
	title?: string,
	lat?: number,
	lang?: number,
}
