// @flow

import type { UserType } from 'Types/UserTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'
import type { PinType } from 'Types/PinTypes'
import type { RouteType } from './RouteTypes'

export type MapType = {
	uid: string,
	title?: string,
	owner?: UserType,
	collaborators?: Array<UserType>,
	classroom?: ClassroomType,
	pins?: Array<PinType>,
	routes?: Array<RouteType>,
}

export type NewMapArgs = {
	title: string,
	classroomUid: string,
	description?: string,
}

export type NewMapInput = {
	input: NewMapArgs,
}

export type UpdateMapArgs = {
	title?: string,
	description?: string,
}
