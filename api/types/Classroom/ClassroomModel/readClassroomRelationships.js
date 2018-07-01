// @flow
import { head, prop, pipe } from 'ramda'
import { query } from '../../../database'
import type { UserType } from '../UserTypes'
import type { ClassroomType } from '../../Classroom/ClassroomTypes'
import { publicFields as classroomFields } from '../../Classroom/ClassroomModel/classroomDBSchema'

// const debug = require('debug')('api')

export const getClassroomMap = async (classroomUid: string): Promise<ClassroomType | null | Error> => {
	const q = /* GraphQL */ `
		query getClassroom($classroomUid: string) {
			getClassroom(func: eq(type, "classroom")) @filter(uid_in(has_map, ${classroomUid})) {
				${classroomFields}
			}
		}
	`
	const variables = { classroomUid }
	const result = await query(q, variables).catch((e) => console.log(e))
	const user = head(result.getClassroom)
	return user
}
