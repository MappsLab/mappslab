// @flow

import type { UserType } from './User'
import type { RouteType } from './Route'
import type { ImageType } from './Media'

export type PinType = {
	__typename: 'Pin',
	uid: string,
	lat: number,
	lng: number,
	owner?: $Shape<UserType>,
	title?: string,
	description?: string,
	route?: {
		route: RouteType,
		isFirst: boolean,
		isLast: boolean,
		nextPin?: PinType,
		prevPin?: PinType,
	},
	image?: ImageType,
	video?: string,
}
