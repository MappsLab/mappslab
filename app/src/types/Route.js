// @flow

import type { PinType } from './Pin'

export type RouteType = {
	uid: string,
	description?: string,
	pins?: Array<PinType>,
}
