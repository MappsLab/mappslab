// @flow

import type { UserType } from './User'

export type PinType = {
	uid: string,
	lat: number,
	lang: number,
	title: string,
	description?: string,
	owner: UserType,
}

export type NewPinType = {
	lat: number,
	lang: number,
	title?: string,
	description?: string,
	owner: UserType,
}
