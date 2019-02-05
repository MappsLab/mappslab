// @flow
import type { NewUserData, UserType } from 'Types/UserTypes'
import faker from 'faker'
import User from 'Models/User'
import { query } from 'Database'
import { generateUser } from 'Shared/mockGenerators'
import { request } from './db'

/**
 * User Read
 */

export const getDBUser = async (uid: string) => {
	const q = /* GraphQL */ `{
		user(func: uid(${uid})) {
			uid
			name
			roles
			email
			temporaryPassword
			temporaryPasswordExpires
			passwordReset.token
			passwordReset.expires
			password
		}
	}
	`
	const result = await query(q)
	return result.user[0]
}

export const getDBUsers = User.getUsers

export const getUser = async (uid: string): Promise<UserType> => {
	const q = /* GraphQL */ `
		query GetUser($uid: String!) {
			user(input: { uid: $uid }) {
				uid
				name
				roles
				pins {
					edges {
						node {
							uid
							title
							maps {
								edges {
									node {
										uid
										title
									}
								}
							}
						}
					}
				}
				classrooms {
					edges {
						node {
							uid
							title
							maps {
								edges {
									node {
										uid
										title
									}
								}
							}
						}
					}
				}
			}
		}
	`
	const variables = { uid }
	const result = await request(q, { variables })
	return result.data.user
}

/**
 * User Creation
 */

let teacherCount = 0
const teacherFixtures = [
	{
		email: 'john@cmwworld.com',
		name: 'John Schaefer',
		temporaryPassword: 'temporary',
	},
]

const createTeacherMutation = /* GraphQL */ `
	mutation CreateTeacher($input: NewTeacherData!) {
		createTeacher(input: $input) {
			uid
			name
			email
			roles
		}
	}
`

const createStudentMutation = /* GraphQL */ `
	mutation CreateStudent($input: NewStudentData!) {
		createStudent(input: $input) {
			uid
			name
			roles
		}
	}
`

const createUser = (type: 'teacher' | 'student') => async (
	args: { userData?: void | NewUserData, assignToClassrooms?: Array<string> },
	{ viewer }: { viewer: UserType } = {},
) => {
	const { userData, assignToClassrooms } = args
	const input = {
		...generateUser(type),
		...userData,
	}
	const context = { viewer }
	const variables = { input, assignToClassrooms }
	const m = type === 'teacher' ? createTeacherMutation : createStudentMutation
	const result = await request(m, { variables, context })
	const mutationName = type === 'teacher' ? 'createTeacher' : 'createStudent'
	const user = result.data[mutationName]
	return user
}

export const createTeacher = createUser('teacher')
export const createStudent = createUser('student')
