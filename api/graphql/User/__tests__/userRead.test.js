/* eslint-disable no-undef */
import { getFirstUsers } from './utils'
import { request } from '../../../__tests__/utils'

let users

beforeAll(async (done) => {
	users = await getFirstUsers()
	done()
})

describe('[pins]', () => {
	it('should fetch a user by uid', async () => {
		const q = /* GraphQL */ `
			query user($uid: String!) {
				user(input: { uid: $uid }) {
					uid
					name
				}
			}
		`
		const variables = { uid: users[0].uid }
		const result = await request(q, { variables })
		expect(result.data.user.name).toBe(users[0].name)
	})

	it("should fetch a fetch a user's classrooms, maps, and pins", async () => {
		const q = /* GraphQL */ `
			query user($uid: String!) {
				user(input: { uid: $uid }) {
					uid
					name
					classrooms {
						pageInfo {
							hasNextPage
						}
						edges {
							cursor
							node {
								uid
								title
							}
						}
					}
					pins {
						pageInfo {
							hasNextPage
						}
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

		const variables = { uid: users[1].uid }
		const result = await request(q, { variables })
		expect(result.data.user.classrooms).toHaveProperty('pageInfo')
		expect(result.data.user.classrooms).toHaveProperty('edges')
		expect(result.data.user.pins).toHaveProperty('pageInfo')
		expect(result.data.user.pins).toHaveProperty('edges')
		expect(result.data.user.pins.edges.length).toBeGreaterThan(1)
	})

	// it('should fetch a users classroom & pin count', async () => {
	// 	//...
	// })
})
