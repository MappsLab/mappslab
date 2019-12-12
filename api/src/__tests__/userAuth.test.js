import { dissoc } from 'ramda'
import { createJWT, verifyJWT } from 'Utils/auth'
import { removeNode } from 'Database'
import { request } from './utils/db'
import { getDBUsers, getDBUser } from './utils/user'
// import { admin, teacher } from '../../../database/stubs/users'

/**
 * NOTE:
 * Only 'admin' is seeded with a password: 'Password#1'
 * all other users have a temporaryPassword of `temporary`
 */
let users
let admin
let teacher
let student1
let student2

beforeAll(async (done) => {
	users = await getDBUsers()
	admin = await getDBUser(users.find((u) => u.roles.includes('admin')).uid)
	teacher = await getDBUser(users.find((u) => u.roles.includes('teacher')).uid)
	student1 = await getDBUser(users.find((u) => u.roles.includes('student')).uid)
	student2 = await getDBUser(users.find((u) => !u.roles.includes('admin') && u.uid !== student1.uid).uid)
	done()
})

const uidLogin = /* GraphQL */ `
	mutation LoginViewer($password: String!, $uid: String, $email: String) {
		loginViewer(input: { uid: $uid, password: $password, email: $email }) {
			... on LoginSuccess {
				jwt {
					token
					expires
				}
				viewer {
					uid
					name
				}
			}
			... on RequiresReset {
				resetToken
			}
		}
	}
`

describe('[createJWT]', () => {
	it('should throw an error if called without the required values', async () => {
		const errorMessage = 'createJWT requires a name, uid, and roles'
		const noUid = () => createJWT(dissoc('uid', student1))
		const noName = () => createJWT(dissoc('name', student1))
		const noRoles = () => createJWT(dissoc('roles', student1))

		expect(noUid).toThrow(errorMessage)
		expect(noName).toThrow(errorMessage)
		expect(noRoles).toThrow(errorMessage)
	})
})

describe('queries', () => {
	it('[loginViewer] should return a jwt and viewer', async () => {
		const variables = { email: admin.email, password: 'Password#1' }
		const result = await request(uidLogin, { variables })
		const { jwt, viewer } = result.data.loginViewer
		expect(/^Bearer/.test(jwt.token)).toBe(true)
		expect(new Date(jwt.expires) - new Date()).toBeGreaterThan(1)
		expect(viewer.name).toBe(admin.name)
	})

	it('[loginViewer] should work with uid', async () => {
		const variables = { uid: admin.uid, password: 'Password#1' }
		const result = await request(uidLogin, { variables })
		const { jwt, viewer } = result.data.loginViewer
		expect(/^Bearer/.test(jwt.token)).toBe(true)
		expect(new Date(jwt.expires) - new Date()).toBeGreaterThan(1)
		expect(viewer.name).toBe(admin.name)
	})

	it('[loginViewer] should return `requiresReset` if the supplied password fails but matches `user.temporaryPassword`', async () => {
		/* Create a new user with a temporary password */
		const createUserMutation = /* GraphQL */ `
			mutation CreateStudent($input: CreateStudentInput!) {
				createStudent(input: $input) {
					uid
					name
				}
			}
		`

		const context = { viewer: admin }
		const createVariables = { input: { name: 'Some Name', temporaryPassword: 'qwerty1' } }
		const createResult = await request(createUserMutation, { variables: createVariables, context })
		const newUser = createResult.data.createStudent
		/* Try logging in with the temporary password */
		const variables = { uid: newUser.uid, password: 'qwerty1' }
		const result = await request(uidLogin, { variables })
		expect(result.data.loginViewer.resetToken.length).toBe(96)

		/* Remove the new user from the database */
		await removeNode(newUser.uid)
	})

	it('[loginViewer] should return a validation error with invalid credentials', async () => {
		const variables = { email: admin.email, password: 'wrongPassword' }
		const result = await request(uidLogin, { variables })
		expect(result.errors[0].message).toBe('Incorrect password.')
	})

	it('[loginViewer] should return a validation error if user does not exist', async () => {
		const uidQuery = /* GraphQL */ `
			mutation LoginViewer($password: String!, $email: String!) {
				loginViewer(input: { email: $email, password: $password }) {
					... on LoginSuccess {
						jwt {
							token
							expires
						}
					}
				}
			}
		`
		const variables = { email: 'nobody@nowhere.com', password: 'password' }
		const result = await request(uidQuery, { variables })
		expect(result.errors[0].message).toBe('Incorrect password.')
	})

	it('[viewer] should return full user data given a JWT-parsed user in the context', async () => {
		const currentViewerQuery = /* GraphQL */ `
			{
				currentViewer {
					jwt {
						token
						expires
					}
					viewer {
						uid
						name
						email
					}
				}
			}
		`
		const originalViewer = createJWT(teacher)
		const JWTviewer = await verifyJWT(originalViewer.token.replace(/^Bearer /, ''))
		const context = { viewer: JWTviewer }
		const result = await request(currentViewerQuery, { context })
		const { viewer, jwt } = result.data.currentViewer
		expect(viewer.uid).toBe(teacher.uid)
		expect(viewer.email).toBe(teacher.email)
		expect(jwt.token).toMatch(/^Bearer /)
		expect(new Date(jwt.expires) - new Date()).toBeGreaterThan(0)
	})

	describe('JWT creation & verification', () => {
		it('should only return username, email, uid in JWT token', async () => {
			const jwt = createJWT(teacher)
			const result = await verifyJWT(jwt.token.replace(/^Bearer /, ''))
			expect(result).toHaveProperty('uid')
			expect(result).toHaveProperty('exp')
			expect(result).toHaveProperty('iat')
			expect(result).toHaveProperty('name')
			expect(result).toHaveProperty('roles')
			expect(result).not.toHaveProperty('disabled')
		})
	})
})

const resetMutation = /* GraphQL */ `
	mutation RequestReset($uid: String) {
		requestPasswordReset(input: { uid: $uid }) {
			success
			messages
		}
	}
`

const requestReset = async (user) => {
	const variables = { uid: user.uid }
	return request(resetMutation, { variables })
}

describe('[requestReset]', () => {
	it('should set reset information when requested', async () => {
		await requestReset(student1)
		const dbUser = await getDBUser(student1.uid)
		expect(dbUser.passwordReset.token).toBeTruthy()
		expect(dbUser.passwordReset.expires).toBeTruthy()
	})
})

const setTempPassMutation = /* GraphQL */ `
	mutation SetTemporaryPassword($uid: String!, $temporaryPassword: String!) {
		setTemporaryPassword(input: { uid: $uid, temporaryPassword: $temporaryPassword }) {
			success
			messages
		}
	}
`

const setTemporaryPassword = async (user, viewer) => {
	const variables = { uid: user.uid, temporaryPassword: 'temporary' }
	const context = { viewer }
	return request(setTempPassMutation, { variables, context })
}

describe('[setTemporaryPassword]', () => {
	it('should allow teachers and admins to set temporary passwords for students', async () => {
		/* Arrange */
		const [result1, result2] = await Promise.all([setTemporaryPassword(student1, teacher), setTemporaryPassword(student2, admin)])
		expect(result1.data.setTemporaryPassword.success).toBe(true)
		expect(result2.data.setTemporaryPassword.success).toBe(true)
	})

	it('should disallow students from setting temporary passwords', async () => {
		const result = await setTemporaryPassword(student1, student2)
		expect(result.errors).toMatchSnapshot()
	})

	it('should disallow anyone from setting temporary passwords for admins', async () => {
		const result = await setTemporaryPassword(admin, admin)
		expect(result.errors).toMatchSnapshot()
	})
})

const getResetToken = async (user) => {
	await setTemporaryPassword(user.uid, 'temporary')
	const variables = { uid: user.uid, password: 'temporary' }
	const result = await request(uidLogin, { variables })
	return result.data.loginViewer.resetToken
}

describe('[resetPassword]', () => {
	const resetPasswordWithToken = /* GraphQL */ `
		mutation ResetPassword($resetToken: String!, $password: String!) {
			resetPassword(input: { resetToken: $resetToken, password: $password }) {
				... on LoginSuccess {
					jwt {
						token
						expires
					}
					viewer {
						uid
						name
					}
				}
				... on RequiresReset {
					resetToken
				}
			}
		}
	`

	it('should throw an error for an invalid token', async () => {
		await requestReset(student1)
		const variables = { password: 'newPassword', resetToken: 'invalid' }
		const result = await request(resetPasswordWithToken, { variables })
		expect(result.errors[0].message).toMatchSnapshot()
	})

	it.skip('should throw an error for an expired token', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it('should reset a users password given a valid token', async () => {
		await requestReset(student1)
		// await setTemporaryPassword(student1)
		const resetToken = await getResetToken(student1)
		const variables = { password: 'newPassword', resetToken }

		const result = await request(resetPasswordWithToken, { variables })
		const { viewer } = result.data.resetPassword
		expect(viewer.uid).toBeTruthy()

		const dbUser = await getDBUser(viewer.uid)
		expect(dbUser.temporaryPassword).toBeFalsy()
		expect(dbUser.temporaryPasswordExpires).toBeFalsy()
		expect(dbUser.resetPassword).toBeFalsy()
		expect(dbUser.resetPassword).toBeFalsy()
	})
})
