// @flow

import type { UserType } from './User'

export type PinType = {
	uid: string,
	lat: number,
	lng: number,
	title: string,
	description?: string,
	owner: UserType,
}

export type NewPinType = {
	uid: string,
	lat: number,
	lng: number,
	title?: string,
	description?: string,
	owner: UserType,
}
