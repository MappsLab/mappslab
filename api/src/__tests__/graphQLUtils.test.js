import { assemblePage } from 'Utils/graphql'
import { getDBUsers } from './utils/user'

let users

beforeAll(async (done) => {
	users = await getDBUsers()
	done()
})

describe('[assemblePage]', () => {
	it('should return a relay-compliant pagination', async () => {
		const result = assemblePage(users, { first: 20 })
		expect(result.edges.length).toBe(20)
		expect(result.pageInfo).toHaveProperty('hasNextPage')
		expect(result.pageInfo).toHaveProperty('hasPrevPage')
		expect(result.pageInfo).toHaveProperty('lastCursor')
	})

	it('should return an empty array if given `undefined`', async () => {
		const result = assemblePage(undefined, { first: 20 })
		expect(result.edges.length).toBe(0)
		expect(result.pageInfo.hasNextPage).toBe(false)
		expect(result.pageInfo.hasPrevPage).toBe(false)
		expect(result.pageInfo.lastCursor).toBe(null)
	})

	it.only('should return correct `pageInfo` values', async () => {
		const twentyFiveUsers = users.slice(0, 25)
		const page1 = assemblePage(twentyFiveUsers, { first: 10 })
		expect(page1.edges.length).toBe(10)
		expect(page1.pageInfo.hasNextPage).toBe(true)
		expect(page1.pageInfo.hasPrevPage).toBe(false)
		expect(page1.pageInfo.lastCursor).toBe(twentyFiveUsers[9].uid)

		let lastIndex = twentyFiveUsers.findIndex(
			(u) => u.uid === page1.pageInfo.lastCursor,
		)
		const second10 = twentyFiveUsers.slice(lastIndex + 1)
		const page2 = assemblePage(second10, {
			first: 10,
			after: page1.pageInfo.lastCursor,
		})
		expect(page2.edges.length).toBe(10)
		expect(page2.pageInfo.hasNextPage).toBe(true)
		expect(page2.pageInfo.hasPrevPage).toBe(true)
		expect(page2.pageInfo.lastCursor).toBe(twentyFiveUsers[19].uid)

		lastIndex = twentyFiveUsers.findIndex(
			(u) => u.uid === page2.pageInfo.lastCursor,
		)
		const third10 = twentyFiveUsers.slice(lastIndex + 1)
		const page3 = assemblePage(third10, {
			first: 10,
			after: page2.pageInfo.lastCursor,
		})
		expect(page3.edges.length).toBe(5)
		expect(page3.pageInfo.hasNextPage).toBe(false)
		expect(page3.pageInfo.hasPrevPage).toBe(true)
		expect(page3.pageInfo.lastCursor).toBe(twentyFiveUsers[24].uid)
	})
})
