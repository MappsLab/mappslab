// @flow
import type { UserType } from './User'

export type ClassroomType = {
	uid: string,
	title: string,
	slug: string,
	students?: Array<UserType>,
	teachers: Array<UserType>,
}
