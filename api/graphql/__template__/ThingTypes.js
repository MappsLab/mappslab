// @flow

import type { UserType } from 'Types/UserTypes'
import type { MapType } from '../Map/Types'

export type ThingType = {
	uid: string,
	title?: string,
	lat: number,
	lang: number,
	owner?: UserType,
	maps?: Array<MapType>,
}

export type ThingInput = {
	title?: string,
	lat?: number,
	lang?: number,
}
