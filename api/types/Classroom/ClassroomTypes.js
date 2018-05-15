// @flow

import type { TeacherType, UserType } from '../User/UserTypes'
import type { MapType } from '../Map/MapTypes'

export type ClassroomType = {
	uid: string,
	title?: string,
	lat: number,
	lang: number,
	students?: Array<UserType>,
	teachers?: Array<TeacherType>,
	maps?: Array<MapType>,
}

export type ClassroomInput = {
	title?: string,
	lat?: number,
	lang?: number,
}
