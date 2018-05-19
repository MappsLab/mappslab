// @flow

import type { MapType } from '../Map/MapTypes'
import type { ClassroomType } from '../Classroom/ClassroomTypes'

export type UserType = {
	uid: string,
	username: string,
	name?: string,
	email?: string,
	classrooms?: Array<ClassroomType>,
	maps?: Array<MapType>,
	role: 'student',
}

export type TeacherType = UserType & {
	email: string,
	role: 'teacher',
}

export type AdminType = TeacherType & {
	role: 'admin',
}

export type UserInput = {
	title?: string,
	lat?: number,
	lang?: number,
	email?: string,
}

export type GetUserArgs = {
	uid: string,
}
