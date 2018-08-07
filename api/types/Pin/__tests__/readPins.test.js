/* eslint-disable no-undef */
import { request } from '../../../__tests__/utils'
import { getFirstPins } from './utils'

let firstPins

beforeAll(async (done) => {
	firstPins = await getFirstPins()
	done()
})

describe('[pin]', () => {
	it('should fetch a pin by id', async () => {
		const q = /* GraphQL */ `
			query pin($uid: String!) {
				pin(input: { uid: $uid }) {
					uid
					title
				}
			}
		`
		const variables = { uid: firstPins[0].uid }
		const result = await request(q, { variables })
		expect(result.data.pin.title).toBe(firstPins[0].title)
	})
})
