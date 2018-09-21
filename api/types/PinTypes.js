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
	lng: number,
	owner: UserType,
	maps?: Array<MapType>,
	routes?: Array<RouteType>,
}

export type NewPinData = {
	title: string,
	lat: number,
	lng: number,
	addToMaps?: Array<string>,
	addToLessons?: Array<string>,
}

export type RemovePinInput = {
	uid: string,
}

export type UpdatePinData = {
	uid: string,
	title?: string,
	lat?: number,
	lng?: number,
	addToMaps?: Array<string>,
	addToLessons?: Array<string>,
}

export type UpdatePinInput = {
	input: UpdatePinArgs,
}
