// @flow
import { head, prop, pipe } from 'ramda'
import { query } from '../../../database'
import type { UserType } from '../UserTypes'
import type { ClassroomType } from '../../Classroom/ClassroomTypes'
import { publicFields } from './classroomDBSchema'

// const debug = require('debug')('api')

export const getMapClassroom = async (classroomUid: string): Promise<ClassroomType | null | Error> => {
	const q = /* GraphQL */ `
		query getClassroom($classroomUid: string) {
			getClassroom(func: eq(type, "classroom")) @filter(uid_in(has_map, ${classroomUid})) {
				${publicFields}
			}
		}
	`
	const variables = { classroomUid }
	const result = await query(q, variables).catch((e) => console.log(e))
	const user = head(result.getClassroom)
	return user
}

export const getUserClassrooms = async (userUid: UserType, args?: PaginationArgs): Promise<Array<ClassroomType> | Error> => {
	const q = /* GraphQL */ `
		query getUserClassrooms {
			classrooms(func: eq(type, "classroom")) @filter(uid_in(~learns_in, ${userUid})) {
				${publicFields}
			}
		}
	`

	const result: Object = await query(q)
	return result.classrooms || []
}
