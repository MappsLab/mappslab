// @flow
import type { UserType } from './User'
import type { MapType } from './Map'

export type ClassroomType = {
	uid: string,
	title: string,
	description?: string,
	slug: string,
	viewerIsTeacher?: boolean,
	students?: Array<UserType>,
	teachers?: Array<UserType>,
	maps?: Array<MapType>,
	__typename: 'Classroom',
}
