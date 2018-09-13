// @flow
import faker from 'faker'
import type { UserType } from 'Types/UserTypes'
import type { NewClassroomData, ClassroomType } from 'Types/ClassroomTypes'
import { request } from './db'

/**
 * Classroom Creation
 */

const generateClassroom = (): NewClassroomData => ({
	title: `${faker.commerce.productAdjective()} ${faker.commerce.department()}`,
})

const createClassroomMutation = /* GraphQL */ `
	mutation CreateClassroom($input: NewClassroomData!) {
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
	mutation AssignUser($input: AssignUserInput!) {
		assignUserToClassroom(input: $input) {
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
	{ input }: { input: { classroomUid: string, userUid: string } },
	{ viewer }: { viewer: UserType } = {},
): Promise<boolean> => {
	const context = { viewer }
	const variables = { input }
	const result = await request(assignUserMutation, { variables, context })
	return result.data.assignUserToClassroom
}
