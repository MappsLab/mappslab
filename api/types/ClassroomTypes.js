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

export type NewClassroomInput = {
	title: string,
	teacherUid?: string,
}

export type NewClassroomArgs = {
	input: NewClassroomInput,
}

export type ClassroomInput = {
	title?: string,
}
