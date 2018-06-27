// @flow
/* eslint-disable no-undef */
import { request } from '../../../__tests__/utils'
import { getUsers } from '../UserModel'
import { removeNode } from '../../../database'

let firstUser

beforeAll(async (done) => {
	const users = await getUsers()
	const [user0] = users
	firstUser = user0
	done()
})

describe('[addPin]', () => {
	it('Should add a new pin', async () => {
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
