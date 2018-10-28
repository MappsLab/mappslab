// @flow

import type { UserType } from './User'

export type PinType = {
	uid: string,
	lat: number,
	lng: number,
	draft: boolean,
	title?: string,
	description?: string,
	owner?: UserType,
}
