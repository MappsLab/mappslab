// @flow

import type { UserType } from 'Types/UserTypes'
import type { MapType } from 'Types/MapTypes'
import type { RouteType } from './RouteTypes'

export type GetPinArgs = {
	uid: string,
}

export type PinType = {
	uid: string,
	title?: string,
	lat: number,
	lang: number,
	owner: UserType,
	maps?: Array<MapType>,
	routes?: Array<RouteType>,
}

export type NewPinArgs = {
	title: string,
	lat: number,
	lang: number,
	addToMaps?: Array<string>,
	addToLessons?: Array<string>,
}

export type NewPinInput = {
	input: NewPinArgs,
}

export type UpdatePinArgs = {
	uid: string,
	title?: string,
	lat?: number,
	lang?: number,
	addToMaps?: Array<string>,
	addToLessons?: Array<string>,
}

export type UpdatePinInput = {
	input: UpdatePinArgs,
}
