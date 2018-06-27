// @flow
/* eslint-disable no-undef */
import { request } from '../../../__tests__/utils'
import { getUsers } from '../UserModel'

let firstUser

beforeAll(async (done) => {
	const users = await getUsers()
	const [user0] = users
	firstUser = user0
	done()
})

describe('[user]', () => {
	it('by uid: should return a user', async () => {
		const q = /* GraphQL */ `
			{
				user(input: { uid: ${firstUser.uid} }) {
					name
				}
			}
		`
		const result = await request(q)
	})
})
