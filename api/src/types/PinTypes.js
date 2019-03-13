// @flow

import type { UserType } from 'Types/UserTypes'
import type { MapType } from 'Types/MapTypes'
import type { ImageType, ImageUpload } from 'Types/ImageTypes'
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
	deleted: Boolean,
	maps?: Array<MapType>,
	routes?: Array<RouteType>,
	route?: {
		route: RouteType,
		nextPin?: PinType,
		prevPin?: PinType,
		isFirst: boolean,
		isLast: boolean,
	},
	image: ImageType,
}

export type NewPinData = {
	title: string,
	lat: number,
	lng: number,
	addToMaps?: Array<string>,
	addToLessons?: Array<string>,
	addToRoute?: {
		connectToPin: string,
		position?: 'BEFORE' | 'AFTER',
	},
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
	addToRoute?: {
		routeUid: string,
		connectToPin?: string,
	},
	deleted: boolean,
	image: ImageUpload,
}
