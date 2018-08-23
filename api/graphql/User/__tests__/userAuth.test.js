// @flow
/* eslint-disable no-undef */
import { createJWT, verifyJWT } from 'Utils/auth'
import { request } from '../../../__tests__/utils'
// import { joseph, john } from '../../../database/stubs/users'
import { getFirstUsers } from './utils'

let users
let john
let joseph

beforeAll(async (done) => {
	users = await getFirstUsers()
	joseph = users.find((u) => u.email === 'joseph@good-idea.studio')
	john = users.find((u) => u.email === 'john@cmwworld.com')
	done()
})

describe('queries', () => {
	it('[loginViewer] should return a jwt and viewer', async () => {
		const uidQuery = /* GraphQL */ `
			mutation LoginViewer($password: String!, $email: String!) {
				loginViewer(credentials: { email: $email, password: $password }) {
					jwt {
						token
						expires
					}
					viewer {
						uid
						name
					}
				}
			}
		`
		const variables = { email: joseph.email, password: 'Password#1' }
		const result = await request(uidQuery, { variables })
		const { jwt, viewer } = result.data.loginViewer
		expect(/^Bearer/.test(jwt.token)).toBe(true)
		expect(jwt.expires).toBeGreaterThan(1)
		expect(viewer.name).toBe(joseph.name)
	})

	it('[loginViewer] should work with uid', async () => {
		const uidQuery = /* GraphQL */ `
			mutation LoginViewer($password: String!, $uid: String!) {
				loginViewer(credentials: { uid: $uid, password: $password }) {
					jwt {
						token
						expires
					}
					viewer {
						uid
						name
					}
				}
			}
		`
		const variables = { uid: john.uid, password: 'Password#1' }
		const result = await request(uidQuery, { variables })
		const { jwt, viewer } = result.data.loginViewer
		expect(/^Bearer/.test(jwt.token)).toBe(true)
		expect(jwt.expires).toBeGreaterThan(1)
		expect(viewer.name).toBe(john.name)
	})

	it('[loginViewer] should return a validation error with invalid credentials', async () => {
		const uidQuery = /* GraphQL */ `
			mutation LoginViewer($password: String!, $email: String!) {
				loginViewer(credentials: { email: $email, password: $password }) {
					jwt {
						token
						expires
					}
					viewer {
						uid
						name
					}
				}
			}
		`
		const variables = { email: joseph.email, password: 'wrongPassword' }
		const result = await request(uidQuery, { variables })
		expect(result.errors[0].message).toBe('Email and password do not match')
	})

	it('[loginViewer] should return a validation error if user does not exist', async () => {
		const uidQuery = /* GraphQL */ `
			mutation LoginViewer($password: String!, $email: String!) {
				loginViewer(credentials: { email: $email, password: $password }) {
					jwt {
						token
						expires
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
