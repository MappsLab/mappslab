// @flow

import type { UserType } from '../User/UserTypes'
import type { ClassroomType } from '../Classroom/ClassroomTypes'
import type { PinType } from '../Pin/PinTypes'
import type { RouteType } from '../Route/RouteTypes'

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
