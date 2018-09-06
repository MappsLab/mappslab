// @flow
import { head, prop, pipe } from 'ramda'
import { query } from 'Database'
import type { UserType } from 'Types/UserTypes'
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
	return result && result.getUser ? result.getUser[0] : null
}

export const getClassroomUsers = (userType: string): Function => async (
	classroomUid: string,
	/* args: PaginationArgs, */
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
		// $FlowFixMe
		prop('classroom'),
		head,
		// $FlowFixMe
		prop(relationship),
	)(result)
	return users
}

export const getClassroomStudents = getClassroomUsers('students')
export const getClassroomTeachers = getClassroomUsers('teachers')

const userInClassroomQuery = (userUid: string, pred: '~learns_in' | '~teaches_in', classroomUid: string): string => `
query getUser {
	classroom(func: uid(${classroomUid})) @filter(uid_in(${pred}, ${userUid})) {
		uid
		type
	}
}
`

export const userLearnsInClassroom = async (userUid: string, classroomUid: string): Promise<boolean> => {
	const q = userInClassroomQuery(userUid, '~learns_in', classroomUid)
	const result = await query(q)
	return result.classroom.length >= 1
}

export const userTeachesInClassroom = async (userUid: string, classroomUid: string): Promise<boolean> => {
	const q = userInClassroomQuery(userUid, '~teaches_in', classroomUid)
	const result = await query(q)
	return result.classroom.length >= 1
}
