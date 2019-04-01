// @flow
import type { PinType } from './Pin'
import type { RouteType } from './Route'
import type { ClassroomType } from './Classroom'

export type MapType = {
	title: string,
	uid: string,
	__typename: 'Map',
	classroom?: ClassroomType,
	description?: string,
	lessons?: Array<any>,
	pins?: Array<PinType>,
	routes?: Array<RouteType>,
}
