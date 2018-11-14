import { removeNode } from 'Database'
import { request } from './utils/db'
import { getDBUsers, getDBUser } from './utils/user'
import { getDBClassrooms } from './utils/classroom'
// import { admin, teacher } from '../../../database/stubs/users'

/**
 * NOTE:
 * Only 'admin' is seeded with a password: 'Password#1'
 * all other users have a temporaryPassword of `temporary`
 */
let users
let admin
let classrooms
let teacher

beforeAll(async (done) => {
	users = await getDBUsers()
	admin = await getDBUser(users.find((u) => u.roles.includes('admin')).uid)
	classrooms = await getDBClassrooms()
	teacher = await getDBUser(users.find((u) => u.roles.includes('teacher')).uid)
	// student1 = await getDBUser(users.find((u) => u.roles.includes('student')).uid)
	// student2 = await getDBUser(users.find((u) => !u.roles.includes('admin') && u.uid !== student1.uid).uid)
	done()
})

describe('[createUser]', () => {
	it('should only allow admins to create admins', async () => {
		/* Try to create a new admin */
		const newAdmin = {
			name: 'Frank',
			temporaryPassword: 'd0gf00d',
			email: 'frank@dogfoodismypassword.com',
		}
		const mu = /* GraphQL */ `
			mutation CreateAdmin($input: NewAdminData!) {
				createAdmin(input: $input) {
					uid
					name
				}
			}
		`
		const variables = { input: newAdmin }
		const badResult = await request(mu, { variables })
		expect(badResult.errors[0].message).toBe('You must be an admin to add new admins')
		/* Create a new admin, while logged in as an admin */
		const context = { viewer: admin }
		const goodResult = await request(mu, { variables, context })
		const newUser = goodResult.data.createAdmin
		expect(newUser.name).toBe(newAdmin.name)
		/* Clean up - remove this user from the database */
		await removeNode(newUser.uid)
	})

	it('should require admins to create new teachers', async () => {
		/* Try to create a new teacher */
		const newTeacher = {
			name: 'Ursa',
			temporaryPassword: 'd0gf00d',
			email: 'ursa@dogfoodismypassword.com',
			addToClassrooms: [classrooms[0].uid],
		}
		const mu = /* GraphQL */ `
			mutation CreateTeacher($input: NewTeacherData!) {
				createTeacher(input: $input) {
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
		const variables = { input: newTeacher }
		const badResult = await request(mu, { variables })
		expect(badResult.errors[0].message).toBe('You must be an admin to add new teachers')
		/* Create a new admin, while logged in as an admin */
		const context = { viewer: admin }
		const goodResult = await request(mu, { variables, context })
		const newUser = goodResult.data.createTeacher
		expect(newUser.name).toBe(newTeacher.name)
		expect(newUser.classrooms.edges[0].node.title).toBe(classrooms[0].title)
		/* Clean up - remove this user from the database */
		await removeNode(newUser.uid)
	})

	it('should require that a teacher creates new students', async () => {
		/* Try to create a new teacher */
		const newStudentData = {
			name: 'Cheddar',
			temporaryPassword: 'd0gf00d',
			email: 'cheds@dogfoodismypassword.com',
			addToClassrooms: [classrooms[0].uid],
		}
		const mu = /* GraphQL */ `
			mutation CreateStudent($input: NewStudentData!) {
				createStudent(input: $input) {
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
		const variables = { input: newStudentData }
		const badResult = await request(mu, { variables })
		expect(badResult.errors[0].message).toBe('You must be an admin to add new teachers')
		/* Create a new admin, while logged in as an admin */
		const context = { viewer: teacher }
		const goodResult = await request(mu, { variables, context })
		const newUser = goodResult.data.createStudent
		expect(newUser.name).toBe(newStudentData.name)
		expect(newUser.classrooms.edges[0].node.title).toBe(classrooms[0].title)
		/* Clean up - remove this user from the database */
		await removeNode(newUser.uid)
	})
})
