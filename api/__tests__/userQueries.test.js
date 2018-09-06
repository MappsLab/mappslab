// @flow
/* eslint-disable no-undef */
import User from 'Models/User'
import { request } from './utils/request'

let firstUser

beforeAll(async (done) => {
	const users = await User.getUsers()
	const [user0] = users
	firstUser = user0
	done()
})

describe('[user]', () => {
	it('by uid: should return a user', async () => {
		const q = /* GraphQL */ `
			query getUser($uid: String!) {
				user(input: { uid: $uid }) {
					name
				}
			}
		`
		const variables = {
			uid: firstUser.uid,
		}
		const result = await request(q, { variables })
		expect(result.data.user.name).toBe(firstUser.name)
	})
})
