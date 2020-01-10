import { getDBUsers } from './utils/user'
import { request } from './utils/db'

let users
let student

beforeAll(async (done) => {
	users = await getDBUsers()
	student = users.find((u) => u.roles.includes('student'))
	done()
})

describe('[user]', () => {
	it('should fetch a user by uid', async () => {
		const q = /* GraphQL */ `
			query user($uid: String) {
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

	it('should fetch a user by email', async () => {
		const q = /* GraphQL */ `
			query user($email: String) {
				user(input: { email: $email }) {
					uid
					name
				}
			}
		`
		const variables = { email: users[0].email }
		const result = await request(q, { variables })
		expect(result.data.user.name).toBe(users[0].name)
	})

	it("should fetch a fetch a user's classrooms and pins", async () => {
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
		const variables = { uid: student.uid }
		const result = await request(q, { variables })
		expect(result.data.user.classrooms).toHaveProperty('pageInfo')
		expect(result.data.user.classrooms).toHaveProperty('edges')
		expect(result.data.user.pins).toHaveProperty('pageInfo')
		expect(result.data.user.pins).toHaveProperty('edges')
		expect(result.data.user.pins.edges.length).toBeGreaterThan(1)
	})

	it.skip('should fetch a users classroom & pin count', async () => {
		// ...
	})

	it.skip('should properly filter users with general operators', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it.skip('should properly filter users by classroom', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})
})

describe('[users]', () => {
	const q = /* GraphQL */ `
		query UsersListQuery(
			$first: Int
			$after: String
			$where: UserFilterParameter
		) {
			users(input: { first: $first, after: $after, where: $where }) {
				pageInfo {
					hasNextPage
					hasPrevPage
					lastCursor
				}
				edges {
					cursor
					node {
						uid
						name
					}
				}
			}
		}
	`

	it('should return a paginated list of users', async () => {
		const result = await request(q, { variables: { first: 10 } })
		expect(result.data.users.pageInfo.hasPrevPage).toBe(false)
		expect(result.data.users.pageInfo.hasNextPage).toBe(true)
		expect(result.data.users.edges.length).toBe(10)
	})
})

describe('[userTeachesInClassroom]', () => {
	it.skip('should return the correct value', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})
})

describe('[userLearnsInClassroom]', () => {
	it.skip('should return the correct value', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})
})
