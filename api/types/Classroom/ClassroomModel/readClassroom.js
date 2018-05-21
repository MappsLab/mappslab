// @flow
import { prop, last, head, pipe } from 'ramda'
import { query } from '../../../database'
import { nodesToEdges } from '../../../utils/dbUtils'
import type { ClassroomType } from '../ClassroomTypes'
import type { TeacherType, UserType } from '../../User/UserTypes'
import type { PageInfo, PaginationArgs, GetNodeArgs, Edge } from '../../shared/sharedTypes'
import { publicFields } from './classroomDBSchema'

export const getClassroom = async (args: GetNodeArgs): Promise<ClassroomType | Error> => {
	const key = head(Object.keys(args))
	if (!key) return null
	const func = key === 'uid' && typeof args.uid === 'string' ? `uid(${args.uid})` : `eq(${key}, $${key})`
	const q = /* GraphQL */ `
		query getClassroom($${key}: string) {
			getClassroom(func: ${func}) {
				${publicFields}
			}
		}
	`
	const result = await query(q, args)
	return head(result.getJson().getClassroom)
}

export const getClassrooms = async (args: PaginationArgs): Promise<{ edges: Array<Edge>, pageInfo: PageInfo } | Error> => {
	const q = /* GraphQL */ `
		query getClassrooms {
			classrooms(func: eq(type, "classroom")) {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	const edges = nodesToEdges(result.getJson().classrooms) || []
	// console.log(edges)
	const lastCursor = prop('cursor', last(edges))

	return {
		edges,
		pageInfo: {
			lastCursor,
			hasNextPage: true,
		},
	}
}

export const getClassroomsByUser = async (
	user: UserType,
	args: PaginationArgs,
): Promise<{ edges: Array<Edge>, pageInfo: PageInfo } | Error> => {
	const q = /* GraphQL */ `
		query getClassroomsByUser {
			classrooms(func: eq(type, "classroom")) @filter(uid_in(~learns_in, ${user.uid})) {
				${publicFields}
			}
		}
	`
	const result = await query(q)
	const edges = nodesToEdges(result.getJson().classrooms) || []
	const lastCursor = prop('cursor', last(edges))
	return {
		edges,
		pageInfo: {
			lastCursor,
			hasNextPage: true,
		},
	}
}

export const getClassroomUsers = (userType: string): Function => async (
	classroom: ClassroomType,
	args: PaginationArgs,
): Promise<{ edges: Array<TeacherType>, pageInfo: PageInfo } | Error> => {
	// TODO: build filter into `teaches` relationship
	const relationship = userType === 'teachers' ? '~teaches_in' : '~learns_in'
	const q = `query getTeachers($username: string) {
		classroom(func: uid(${classroom.uid})) {
			title
			${relationship} {
				name
				uid
				role
			}
		}
	}`

	const result = await query(q)
	const edges = pipe(
		// Get the first result from the query (should always be 1)
		prop('classroom'),
		head,
		prop(relationship),
		nodesToEdges,
	)(result.getJson())
	const lastCursor = prop('cursor', last(edges))
	return {
		edges,
		pageInfo: {
			lastCursor,
			hasNextPage: true, // TODO +1 the query, slice it when returned, and set this to true if there are more than requested
		},
	}
}

export const getStudents = getClassroomUsers('students')
export const getTeachers = getClassroomUsers('teachers')
