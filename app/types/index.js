// @flow

export type UserType = {
	uid: string,
	name: string,
	role: 'teacher' | 'student',
}

export type ClassroomType = {
	uid: string,
	title: string,
	slug: string,
	students?: Array<UserType>,
	teachers?: Array<UserType>,
}
