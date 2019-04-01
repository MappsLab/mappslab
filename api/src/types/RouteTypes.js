// @flow

import type { UserType } from 'Types/UserTypes'
import type { MapType } from 'Types/MapTypes'
import type { PinType } from 'Types/PinTypes'
import type { ImageUpload } from 'Types/ImageTypes'

export type RouteType = {
	uid: string,
	owner: UserType,
	pins: Array<PinType>,
	description: string,
	title?: string,
	maps?: Array<MapType>,
	image?: Image,
}

export type GetRouteArgs = {
	uid: string,
}

export type NewRouteData = {
	title?: string,
	pins: Array<string>,
}

export type UpdateRouteData = NewRouteData & {
	uid: string,
	pins: Array<string>, // pin UIDs
	description?: string,
	title?: string,
	video: String,
	image: ImageUpload,
}
