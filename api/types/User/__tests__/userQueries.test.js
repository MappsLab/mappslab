// @flow
/* eslint-disable no-undef */
import { request } from '../../../__tests__/utils'
import { getUsers } from '../UserModel'

let firstUser

beforeAll(async (done) => {
	const users = await getUsers()
	firstUser = users[0]
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
		console.log(q)
		const result = await request(q)
		console.log(result)
	})
})
