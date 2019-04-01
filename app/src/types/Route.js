// @flow

import type { PinType } from './Pin'
import type { UserType } from './User'

export type RouteType = {
	__typename: 'Route',
	uid: string,
	title?: string,
	owner?: $Shape<UserType>,
	description?: string,
	pins?: Array<PinType>,
}
