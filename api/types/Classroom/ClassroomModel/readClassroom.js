// @flow
import { prop, last, head } from 'ramda'
import db from '../../../database'
import { getEdgesOfFirst } from '../../../utils/dbUtils'
import type { ClassroomType } from '../ClassroomTypes'
import type { TeacherType } from '../../User/UserTypes'
import type { PageInfo, PaginationArgs } from '../../shared/sharedTypes'

export const getClassroom = () => {}

export const getClassrooms = () => {}

export const getUsers = (userType: string): Function => async (
	classroom: ClassroomType,
	args: PaginationArgs,
): Promise<{ edges: Array<TeacherType>, pageInfo: PageInfo } | Error> => {
	// TODO: build filter into `teaches` relationship

	const relationshipField = userType === 'teacher' ? '~teaches' : '~isInClass'
	const query = `query getTeachers($username: string) {
		classroom(func: uid(${classroom.uid}))) {
			~${relationshipField}
		}
	}`

	const result = await db
		.newTxn()
		.query(query)
		.catch((e) => {
			throw new Error(e)
		})
	const edges = getEdgesOfFirst(result, 'classroom', relationshipField)
	const lastCursor = prop('cursor', last(edges))
	return {
		edges,
		pageInfo: {
			lastCursor,
			hasNextPage: true, // TODO +1 the query, slice it when returned, and set this to true if there are more than requested
		},
	}
}

export const getStudents = getUsers('students')
export const getTeachers = getUsers('teachers')
