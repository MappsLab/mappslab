/* eslint-disable no-undef */
import { request, getViewerForContext } from '../../../__tests__/utils'
import { removeNode, removeEdge } from '../../../database'

const q = /* GraphQL */ `
	mutation addPin($title: String!, $lat: Float!, $lang: Float!) {
		addPin(input: { title: $title, lat: $lat, lang: $lang }) {
			uid
			title
			lat
			lang
			owner {
				uid
				name
			}
		}
	}
`
const pinsToRemove = []

const variables = {
	title: 'a new pin',
	lat: 145.123,
	lang: 111.222,
}

const context = {}

beforeAll(async (done) => {
	context.viewer = await getViewerForContext()
	done()
})

afterEach(async (done) => {
	if (pinsToRemove.length)
		pinsToRemove.map(async (pin) => {
			await removeEdge({ fromUid: pin.owner.uid, pred: 'pinned', toUid: pin.uid })
			await removeNode(pin.uid)
		})
	done()
})

describe('[addPin]', () => {
	it('should return an error if there is no current viewer', async () => {
		const result = await request(q, { variables })
		expect(result.errors).toMatchSnapshot()
	})
	it('Should add a new pin', async () => {
		const result = await request(q, { variables, context })
		expect(result.data.addPin.title).toBe(variables.title)
		expect(result.data.addPin.owner.name).toBe(context.viewer.name)
		pinsToRemove.push(result.data.addPin)
	})
})
