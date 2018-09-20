/* eslint-disable no-undef */
import { removeNode, removeEdge } from 'Database'
import { request, getViewerForContext } from '../../../__tests__/utils'
import { getFirstMaps } from '../../Map/__tests__/utils'

let dbMaps
const context = {}

beforeAll(async (done) => {
	dbMaps = await getFirstMaps()
	context.viewer = await getViewerForContext()

	done()
})

const q = /* GraphQL */ `
	mutation addPin($title: String!, $lat: Float!, $lng: Float!, $addToMaps: [String], $lessonUids: [String]) {
		addPin(input: { title: $title, lat: $lat, lng: $lng, addToMaps: $addToMaps, lessonUids: $lessonUids }) {
			uid
			title
			lat
			lng
			owner {
				uid
				name
			}
			maps {
				pageInfo {
					hasNextPage
					lastCursor
				}
				edges {
					cursor
					node {
						uid
						title
					}
				}
			}
		}
	}
`
const pinsToRemove = []

const variables = {
	title: 'a new pin',
	lat: 145.123,
	lng: 111.222,
}

const removeNewPins = async () => {
	if (pinsToRemove.length)
		pinsToRemove.map(async (pin) => {
			await removeEdge({ fromUid: pin.owner.uid, pred: 'pinned', toUid: pin.uid })
			await removeNode(pin.uid)
		})
}

const sleep = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms))

afterEach(async (done) => {
	await removeNewPins
	done()
})

describe('[addPin]', () => {
	it('should return an error if there is no current viewer', async () => {
		const result = await request(q, { variables })
		expect(result.errors).toMatchSnapshot()
	})

	it('Should add a new pin (with a map and without a map)', async () => {
		const result = await request(q, { variables, context })
		const { title, owner, maps } = result.data.addPin
		expect(title).toBe(variables.title)
		expect(owner.name).toBe(context.viewer.name)
		expect(maps.edges.length).toBe(0)
		expect(maps.pageInfo.hasNextPage).toBe(false)
		expect(maps.pageInfo.lastCursor).toBe(null)
		pinsToRemove.push(result.data.addPin)

		await removeNewPins()
		await sleep()

		const vars = {
			addToMaps: [dbMaps[0].uid],
			...variables,
		}
		const withMapResult = await request(q, { variables: vars, context })
		const { title: withMapTitle, owner: withMapOwner, maps: withMapMaps } = withMapResult.data.addPin
		expect(withMapTitle).toBe(variables.title)
		expect(withMapOwner.name).toBe(context.viewer.name)
		expect(withMapMaps.pageInfo.hasNextPage).toBe(false)
		expect(withMapMaps.pageInfo.lastCursor).toBe(dbMaps[0].uid)
		expect(withMapMaps.edges[0].node.title).toBe(dbMaps[0].title)
		pinsToRemove.push(result.data.addPin)
	})

	it('Should add a new pin (with map)', async () => {})
})
