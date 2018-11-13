// @flow
import faker from 'faker'
import type { UserType } from 'Types/UserTypes'
import type { NewClassroomData, ClassroomType } from 'Types/ClassroomTypes'
import Classroom from 'Models/Classroom'
import { request } from './db'

/**
 * Read Classroom
 */

export const getDBClassrooms = Classroom.getClassrooms

/**
 * Classroom Creation
 */

const fixtures = [
	{
		title: 'Social Studies',
		description: faker.lorem.paragraphs(),
	},
	{
		title: 'Study Period',
		description: faker.lorem.paragraph(),
	},
]

let count = 0

const generateClassroom = (): NewClassroomData => {
	const classroom =
		count < fixtures.length
			? fixtures[count]
			: {
					title: `${faker.commerce.productAdjective()} ${faker.commerce.department()}`,
					description: faker.lorem.paragraphs(),
			  }
	count += 1
	return classroom
}

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
