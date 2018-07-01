// @flow

/* eslint-disable no-use-before-define */

export type PinType = {
	lat: number,
	lang: number,
	title: string,
	description?: string,
	owner: UserType,
}

export type UserType = {
	uid: string,
	name: string,
	role: 'teacher' | 'student',
	pins?: Array<PinType>,
	classrooms?: Array<ClassroomType>,
}

export type ViewerType = UserType & {
	email?: string,
}

export type MapType = {
	title: string,
	uid: string,
}

export type ClassroomType = {
	uid: string,
	title: string,
	slug: string,
	students?: Array<UserType>,
	teachers?: Array<UserType>,
}
