// @flow
import type { UserType } from 'Types/UserTypes'
import type {  ClassroomType } from 'Types/ClassroomTypes'
import { generateClassroom } from 'Shared/mockGenerators'
import Classroom from 'Models/Classroom'
import { request } from './db'

/**
 * Read Classroom
 */

export const getDBClassrooms = Classroom.getClassrooms

/**
 * Classroom Creation
 */

const createClassroomMutation = /* GraphQL */ `
	mutation CreateClassroom($input: NewClassroomInput!) {
		createClassroom(input: $input) {
			uid
			title
		}
	}
`

export const createClassroom = async (
	args: { input?: void | NewClassroomData } = {},
	{ viewer }: { viewer: UserType } = {},
): Promise<ClassroomType> => {
	const input = args.input || generateClassroom()
	const context = { viewer }
	const variables = { input }
	const result = await request(createClassroomMutation, { variables, context })
	return result.data.createClassroom
}

/**
 * Assign Students & Teachers
 */

const assignUserMutation = /* GraphQL */ `
	mutation AssignUser($input: UpdateUserInput!) {
		updateUser(input: $input) {
			uid
			name
			classrooms {
				edges {
					node {
						uid
						title
					}
				}
			}
		}
	}
`

export const assignUser = async (
	{ input }: { input: { addToClassrooms: Array<string>, uid: string } },
	{ viewer }: { viewer: UserType } = {},
): Promise<boolean> => {
	const context = { viewer }
	const variables = { input }
	const result = await request(assignUserMutation, { variables, context })
	return result.data.updateUser
}
