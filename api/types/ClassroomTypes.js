// @flow

import type { TeacherType, UserType } from 'Types/UserTypes'
import type { MapType } from 'Types/MapTypes'

export type ClassroomType = {
	uid: string,
	title?: string,
	students?: Array<UserType>,
	teachers?: Array<TeacherType>,
	maps?: Array<MapType>,
}

export type ClassroomInput = {
	title?: string,
	lat?: number,
	lang?: number,
}
