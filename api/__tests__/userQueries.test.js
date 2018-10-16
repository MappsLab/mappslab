// @flow

import { request } from './utils/db'
import { getDBUsers } from './utils/user'

let firstUser

beforeAll(async (done) => {
	const users = await getDBUsers()
	firstUser = users[0]
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
