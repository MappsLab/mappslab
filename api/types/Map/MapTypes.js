// @flow

import type { UserType } from '../User/UserTypes'
import type { MapType } from '../Map/Types'

export type PinType = {
	uid: string,
	title?: string,
	lat: number,
	lang: number,
	owner?: UserType,
	maps?: Array<MapType>,
}

export type PinInput = {
	title?: string,
	lat?: number,
	lang?: number,
}
