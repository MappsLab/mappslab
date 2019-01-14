import { request } from './utils/db'
import { getDBMaps } from './utils/map'

let maps

beforeAll(async (done) => {
	maps = await getDBMaps()
	done()
})

describe('[map]', () => {
	it('[map] should fetch a map by uid', async () => {
		const query = /* GraphQL */ `
			query map($uid: String!) {
				map(input: { uid: $uid }) {
					uid
					title
				}
			}
		`
		const variables = { uid: maps[0].uid }
		const result = await request(query, { variables })
		expect(result.data.map.title).toBe(maps[0].title)
	})

	it('should fetch a maps pins and other connections', async () => {
		const query = /* GraphQL */ `
			query map($uid: String!) {
				map(input: { uid: $uid }) {
					uid
					title
					pins {
						pageInfo {
							hasNextPage
							lastCursor
						}
						edges {
							cursor
							node {
								uid
								title
								description
								lat
								lng
							}
						}
					}
				}
			}
		`
		const variables = { uid: maps[5].uid }
		const result = await request(query, { variables })
		expect(result.data.map.title).toBe(maps[5].title)
		expect(result.data.map.pins.edges.length).toBeGreaterThan(0)
	})
})
