// @flow

import type { MapType } from 'Types/MapTypes'
import type { ClassroomType } from 'Types/ClassroomTypes'

export type JWT = {
	token: string,
	expires: number,
}

export type Role = 'admin' | 'teacher' | 'student'

export type UserType = {
	uid: string,
	username: string,
	name?: string,
	classrooms?: Array<ClassroomType>,
	maps?: Array<MapType>,
	roles: Array<Role>,
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

export type UpdateUserInput = {
	name?: string,
	email?: string,
}

export type NewUserData = {
	name: string,
	email?: string,
	temporaryPassword?: string,
	roles: Array<Role>,
}

export type NewUserInput = {
	userData: NewUserData,
	addToClassrooms?: Array<string>,
}

export type GetUserInput = {
	uid?: string,
	email?: string,
}

export type Credentials = {
	uid?: string,
	email?: string,
	password: string,
}

export type PasswordResetInput = {
	resetToken: string,
	password: string,
}

export type SetTemporaryPasswordInput = {
	uid: string,
	temporaryPassword: string,
}

export type PasswordReset = {
	token: string,
	expires: Date,
}
