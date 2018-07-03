/* eslint-disable no-undef */
import { request, getViewerForContext } from '../../../__tests__/utils'
import { removeNode, removeEdge } from '../../../database'
import { getFirstMaps } from '../../Map/__tests__/utils'

let dbMaps

beforeAll(async (done) => {
	dbMaps = await getFirstMaps()
	done()
})

const q = /* GraphQL */ `
	mutation addPin($title: String!, $lat: Float!, $lang: Float!, $mapUids: [String], $lessonUids: [String]) {
		addPin(input: { title: $title, lat: $lat, lang: $lang, mapUids: $mapUids, lessonUids: $lessonUids }) {
			uid
			title
			lat
			lang
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

	it('Should add a new pin (with no map)', async () => {
		const result = await request(q, { variables, context })
		const { title, owner, maps } = result.data.addPin
		expect(title).toBe(variables.title)
		expect(owner.name).toBe(context.viewer.name)
		expect(maps.edges.length).toBe(0)
		expect(maps.pageInfo.hasNextPage).toBe(false)
		expect(maps.pageInfo.lastCursor).toBe(null)
		pinsToRemove.push(result.data.addPin)
	})

	it.only('Should add a new pin (with map)', async () => {
		const vars = {
			mapUids: [dbMaps[0].uid],
			...variables,
		}
		const result = await request(q, { variables: vars, context })
		const { title, owner, maps } = result.data.addPin
		expect(title).toBe(variables.title)
		expect(owner.name).toBe(context.viewer.name)
		expect(maps.pageInfo.hasNextPage).toBe(false)
		expect(maps.pageInfo.lastCursor).toBe(dbMaps[0].uid)
		expect(maps.edges[0].node.title).toBe(dbMaps[0].title)
		pinsToRemove.push(result.data.addPin)
	})
})
