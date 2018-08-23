// @flow

import type { MapType } from 'Types/MapTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'

export type UserType = {
	uid: string,
	username: string,
	name?: string,
	classrooms?: Array<ClassroomType>,
	maps?: Array<MapType>,
	roles: Array<string>,
}

export type StudentType = UserType & {
	roles: ['student'],
}

export type TeacherType = UserType & {
	email: string,
	roles: ['teacher'],
}

export type ViewerType =
	| UserType
	| (TeacherType & {
			email?: string,
	  })

export type AdminType = TeacherType & {
	roles: ['admin'],
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

export type GetUserInput = {
	input: GetUserArgs,
}

export type Credentials = {
	uid?: string,
	email?: string,
	password: string,
}
