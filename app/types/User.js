// @flow
import type { PinType } from './Pin'
import type { ClassroomType } from './Classroom'

type Role = 'teacher' | 'student'

export type UserType = {
	uid: string,
	name: string,
	roles: Array<Role>,
	pins?: Array<PinType>,
	classrooms?: Array<ClassroomType>,
}

export type ViewerType = UserType & {
	email?: string,
}
