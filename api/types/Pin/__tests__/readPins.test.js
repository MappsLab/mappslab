/* eslint-disable no-undef */
import { request } from '../../../__tests__/utils'
import { getFirstPin } from './utils'

let firstPin

beforeAll(async (done) => {
	firstPin = await getFirstPin()
	done()
})

describe('[pin]', () => {
	it('should fetch a pin by id', async () => {
		const q = /* GraphQL */ `
			query pin($uid: String!) 
			{
			pin(input: { uid: $uid }) {
				uid
				title
			}
		}`
		const variables = { uid: firstPin.uid }
		const result = await request(q, { variables })
		expect(result.data.pin.title).toBe(firstPin.title)
	})
})
