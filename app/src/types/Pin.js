// @flow

import type { UserType } from './User'

export type PinType = {
	uid: string,
	lat: number,
	lng: number,
	owner: UserType,
	draft: boolean,
	title?: string,
	description?: string,
}
