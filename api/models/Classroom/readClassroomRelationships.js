// @flow
import { query } from 'Database'
import type { ClassroomType } from 'Types/ClassroomTypes'
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
	const result = await query(q, variables)
	if (!result) return result
	const user = result.getClassroom[0]
	return user
}

export const getUserClassrooms = async (userUid: string /* args?: PaginationArgs */): Promise<Array<ClassroomType> | Error> => {
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
