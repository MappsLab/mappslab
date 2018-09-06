/* eslint-disable no-undef */
import { createJWT, verifyJWT } from 'Utils/auth'
import { request } from '../../../__tests__/utils'
import { mutateNode } from 'Database'
// import { joseph, john } from '../../../database/stubs/users'
import { createUser } from './userRegistration.test'
import { getFirstUsers } from './utils'


let users
let john
let joseph
let alex

beforeAll(async (done) => {
	users = await getFirstUsers()
	joseph = users.find((u) => u.email === 'joseph@good-idea.studio')
	john = users.find((u) => u.email === 'john@cmwworld.com')
	alex = users.find((u) => u.name === 'Alex Johnstone')
	done()
})

const createNewUser

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

describe('queries', () => {
	it('[loginViewer] should return a jwt and viewer', async () => {
		const variables = { email: joseph.email, password: 'Password#1' }
		const result = await request(uidLogin, { variables })
		const { jwt, viewer } = result.data.loginViewer
		expect(/^Bearer/.test(jwt.token)).toBe(true)
		expect(jwt.expires).toBeGreaterThan(1)
		expect(viewer.name).toBe(joseph.name)
	})

	it('[loginViewer] should work with uid', async () => {
		const variables = { uid: john.uid, password: 'Password#1' }
		const result = await request(uidLogin, { variables })
		const { jwt, viewer } = result.data.loginViewer
		expect(/^Bearer/.test(jwt.token)).toBe(true)
		expect(jwt.expires).toBeGreaterThan(1)
		expect(viewer.name).toBe(john.name)
	})

	it('[loginViewer] should return `requiresReset` if the supplied password fails but matches `user.temporaryPassword`', async () => {
		const variables = { uid: alex.uid, password: 'temporary' }
		const result = await request(uidLogin, { variables })
		expect(result.data.loginViewer.resetToken.length).toBe(96)
	})

	it('[loginViewer] should return a validation error with invalid credentials', async () => {
		const variables = { email: joseph.email, password: 'wrongPassword' }
		const result = await request(uidLogin, { variables })
		expect(result.errors[0].message).toBe('Email and password do not match')
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
		expect(result.errors[0].message).toBe('Email and password do not match')
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
		const originalViewer = createJWT(john)
		const JWTviewer = await verifyJWT(originalViewer.token.replace(/^Bearer /, ''))
		const context = { viewer: JWTviewer }
		const result = await request(currentViewerQuery, { context })
		const { viewer, jwt } = result.data.currentViewer
		expect(viewer.uid).toBe(john.uid)
		expect(viewer.email).toBe(john.email)
		expect(jwt.token).toMatch(/^Bearer /)
		expect(jwt.expires).toBe(86400)
	})

	describe('JWT creation & verification', async () => {
		it('should only return username, email, uid in JWT token', async () => {
			const jwt = createJWT(john)
			const result = await verifyJWT(jwt.token.replace(/^Bearer /, ''))
			expect(result).toHaveProperty('uid')
			expect(result).toHaveProperty('exp')
			expect(result).toHaveProperty('iat')
			expect(result).not.toHaveProperty('name')
			expect(result).not.toHaveProperty('disabled')
		})
	})
})

describe('[updatePassword]', () => {


	const getResetToken = async () => {
		const variables = { uid: alex.uid, password: 'temporary' }
		const result = await request(uidLogin, { variables })
		return result.data.loginViewer.resetToken
	}

	const updatePasswordWithToken = /* GraphQL */ `
		mutation UpdatePassword($resetToken: String!, $password: String!) {
			updatePassword(input: { resetToken: $resetToken, password: $password }) {
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

	it.only('should throw an error for an invalid token', async () => {
		const variables = { password: 'newPassword', resetToken: 'invalid' }
		const result = await request(updatePasswordWithToken, { variables })
		expect(result.errors[0].message).toBe('This reset token is invalid')
	})

	it.skip('should throw an error for an expired token', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it.skip('should reset a users password given a valid token', async () => {
		const resetToken = await getRestToken()
		const variables = { password: 'newPassword', resetToken }
		const result = await request(updatePasswordWithToken, { variables })
		expect(result.errors[0].message).toBe('This reset token is invalid')

		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})
})
