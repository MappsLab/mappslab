// @flow
/* eslint-disable no-undef */
import { request } from '../../../__tests__/utils'
import { getFirstMaps } from './utils'

let maps

beforeAll(async (done) => {
	maps = await getFirstMaps()
	done()
})

describe('[map]', () => {
	it('[map] should fetch a map by uid', async () => {
		const query = /* GraphQL */ `
			query Map($uid: String!) {
				map(input: { uid: $uid }) {
					uid
					title
				}
			}
		`
		const variables = { uid: maps[0].uid }
		const result = await request(query, { variables }).catch((e) => console.log(e))
		expect(result.data.map.title).toBe(maps[0].title)
	})
})
