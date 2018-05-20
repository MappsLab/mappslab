// @flow
/* eslint-disable no-undef */
import { request } from '../../../__tests__/utils'
import { createJWT, verifyJWT } from 'Api/utils/auth'
import { joseph } from '../../../database/stubs/users'

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
		console.log(result)
		const { jwt, viewer } = result.data.loginViewer
		expect(/^Bearer/.test(jwt.token)).toBe(true)
		expect(jwt.expires).toBeGreaterThan(1)
		expect(viewer.name).toBe(joseph.name)
	})

	// it('[loginViewer] should return `requiresReset` if they need to reset their password', async () => {
	// 	// TODO
	// })

	// 	it('[loginViewer] should return a validation error with invalid credentials', async () => {
	// 		const uidQuery = /* GraphQL */ `
	// 			mutation LoginViewer($password: String!, $email: String!) {
	// 				loginViewer(credentials: { email: $email, password: $password }) {
	// 					jwt {
	// 						token
	// 						expires
	// 					}
	// 					viewer {
	// 						username
	// 					}
	// 				}
	// 			}
	// 		`
	// 		const variables = { email: joseph.email, password: 'wrongPassword' }
	// 		const result = await request(uidQuery, { variables })
	// 		expect(result.errors[0].message).toBe('Email and password do not match')
	// 	})

	// 	it('[loginViewer] should return a validation error if user does not exist', async () => {
	// 		const uidQuery = /* GraphQL */ `
	// 			mutation LoginViewer($password: String!, $email: String!) {
	// 				loginViewer(credentials: { email: $email, password: $password }) {
	// 					jwt {
	// 						token
	// 						expires
	// 					}
	// 				}
	// 			}
	// 		`
	// 		const variables = { email: 'nobody@nowhere.com', password: 'password' }
	// 		const result = await request(uidQuery, { variables })
	// 		expect(result.errors[0].message).toBe('Email and password do not match')
	// 	})

	// 	it('[viewer] should return full user data given a JWT-parsed user in the context', async () => {
	// 		const currentViewerQuery = /* GraphQL */ `
	// 			{
	// 				viewer {
	// 					uid
	// 					username
	// 					bioLine
	// 					email
	// 				}
	// 			}
	// 		`
	// 		const originalViewer = createJWT(waverly)
	// 		const JWTviewer = await verifyJWT(originalViewer.token.replace(/^Bearer /, ''))
	// 		const context = { viewer: JWTviewer }
	// 		const result = await request(currentViewerQuery, { context })
	// 		const { viewer } = result.data
	// 		expect(viewer.uid).toBe(waverly.uid)
	// 		expect(viewer.username).toBe(waverly.username)
	// 		expect(viewer.bioLine).toBe(waverly.bioLine)
	// 		expect(viewer.email).toBe(waverly.email)
	// 	})
	// })

	// describe('JWT creation & verification', async () => {
	// 	it('should only return username, email, uid in JWT token', async () => {
	// 		const jwt = createJWT(waverly)
	// 		const result = await verifyJWT(jwt.token.replace(/^Bearer /, ''))
	// 		expect(result).toHaveProperty('email')
	// 		expect(result).toHaveProperty('uid')
	// 		expect(result).toHaveProperty('username')
	// 		expect(result).toHaveProperty('exp')
	// 		expect(result).toHaveProperty('iat')
	// 		expect(result).not.toHaveProperty('bioLine')
	// 		expect(result).not.toHaveProperty('disabled')
	// 	})
})
