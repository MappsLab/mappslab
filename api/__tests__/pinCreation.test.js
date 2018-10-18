import { removeNode, removeEdge } from 'Database'
import { request } from './utils/db'
import { getDBUsers } from './utils/user'
import { getDBMaps } from './utils/map'

let dbMaps
let dbUsers
const context = {}

beforeAll(async (done) => {
	dbMaps = await getDBMaps()
	dbUsers = await getDBUsers()
	context.viewer = dbUsers[0]
	done()
})

const q = /* GraphQL */ `
	mutation createPin($title: String!, $lat: Float!, $lng: Float!, $addToMaps: [String], $lessonUids: [String]) {
		createPin(input: { title: $title, lat: $lat, lng: $lng, addToMaps: $addToMaps, lessonUids: $lessonUids }) {
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

describe('[createPin]', () => {
	it('should return an error if there is no current viewer', async () => {
		const result = await request(q, { variables })
		expect(result.errors).toMatchSnapshot()
	})

	it('Should add a new pin (with a map and without a map)', async () => {
		const result = await request(q, { variables, context })
		const { title, owner, maps } = result.data.createPin
		expect(title).toBe(variables.title)
		expect(owner.name).toBe(context.viewer.name)
		expect(maps.edges.length).toBe(0)
		expect(maps.pageInfo.hasNextPage).toBe(false)
		expect(maps.pageInfo.lastCursor).toBe(null)
		pinsToRemove.push(result.data.createPin)

		await removeNewPins()
		await sleep()

		const vars = {
			addToMaps: [dbMaps[0].uid],
			...variables,
		}
		const withMapResult = await request(q, { variables: vars, context })
		const { title: withMapTitle, owner: withMapOwner, maps: withMapMaps } = withMapResult.data.createPin
		expect(withMapTitle).toBe(variables.title)
		expect(withMapOwner.name).toBe(context.viewer.name)
		expect(withMapMaps.pageInfo.hasNextPage).toBe(false)
		expect(withMapMaps.pageInfo.lastCursor).toBe(dbMaps[0].uid)
		expect(withMapMaps.edges[0].node.title).toBe(dbMaps[0].title)
		pinsToRemove.push(result.data.createPin)
	})

	it('Should add a new pin (with map)', async () => {})
})
