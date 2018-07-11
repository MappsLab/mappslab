// @flow
import { head, prop, pipe } from 'ramda'
import { query } from '../../../database'
import type { UserType } from '../UserTypes'
import type { PaginationArgs } from '../../shared/sharedTypes'
import { publicFields } from './userDBSchema'

// const debug = require('debug')('api')

export const getPinOwner = async (pinUid: string): Promise<UserType | null | Error> => {
	const q = /* GraphQL */ `
		query getUser($uid: string) {
			getUser(func: eq(type, "user")) @filter(uid_in(pinned, ${pinUid})) {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	const user = head(result.getUser)
	return user
}

export const getClassroomUsers = (userType: string): Function => async (
	classroomUid: string,
	args: PaginationArgs,
): Promise<Array<UserType> | Error> => {
	// TODO: build filter into `teaches` relationship
	const relationship = userType === 'teachers' ? '~teaches_in' : '~learns_in'
	const q = `query getTeachers($username: string) {
		classroom(func: uid(${classroomUid})) {
			title
			${relationship} {
				${publicFields}
			}
		}
	}`

	const result = await query(q)
	const users = pipe(
		// Get the first result from the query (should always be 1)
		prop('classroom'),
		head,
		prop(relationship),
	)(result)
	return users
}

export const getClassroomStudents = getClassroomUsers('students')
export const getClassroomTeachers = getClassroomUsers('teachers')
