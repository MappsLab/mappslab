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
	description: string,
	teacherUid?: string,
}

export type UpdateClassroomInput = {
	uid: string,
	title?: string,
	description?: string,
}

export type NewClassroomArgs = {
	input: NewClassroomInput,
	assignTeachers?: Array<string>,
}

export type AssignUserInput = {
	classroomUid: string,
	userUid: string,
}

export type ClassroomInput = {
	title?: string,
}
