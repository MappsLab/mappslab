import { removeNode, removeEdge } from 'Database'
import { request } from './utils/db'
import { getDBPins } from './utils/pin'
import { getDBUsers } from './utils/user'
import { getDBMaps } from './utils/map'

const pinsToRemove = []
const routesToRemove = []

const removeNewPins = async () => {
	if (pinsToRemove.length)
		await Promise.all(
			pinsToRemove.map(async (pin) => {
				await removeEdge({ fromUid: pin.owner.uid, pred: 'pinned', toUid: pin.uid })
				await removeNode(pin.uid)
			}),
		)
}

const removeNewRoutes = async () => {
	if (routesToRemove.length) {
		await Promise.all(
			routesToRemove.map(async (route) => {
				await removeEdge({ fromUid: route.uid, pred: 'includes_pin', toUid: '*' })
				await removeNode(route.uid)
			}),
		)
	}
}

afterEach(async (done) => {
	// await removeNewPins()
	// await removeNewRoutes()
	done()
})

const addMutation = /* GraphQL */ `
	mutation createPin($input: NewPinInput!) {
		createPin(input: $input) {
			uid
			title
			routes {
				edges {
					cursor
					node {
						uid
						pins {
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
			}
		}
	}
`

describe('[addPin]', () => {
	it('should create new routes if addToRoute.connectToPin is specified', async () => {
		const users = await getDBUsers()
		const maps = await getDBMaps()

		const viewer = users[0]
		const context = {
			viewer,
		}

		/**
		 Create the first pin.
		 */
		const firstPinInput = {
			title: 'pin A',
			lat: 145.123,
			lng: 111.333,
			addToMaps: [maps[0].uid],
		}
		const pin1result = await request(addMutation, { context, variables: { input: firstPinInput } })
		const pin1 = pin1result.data.createPin
		pinsToRemove.push(pin1)

		/**
			Create the second pin, in a new route after the first pin
		 */
		const pin2input = {
			title: 'pin B',
			lat: 146.123,
			lng: 112.333,
			addToMaps: [maps[0].uid],
			addToRoute: {
				connectToPin: pin1.uid,
			},
		}
		const pin2result = await request(addMutation, { context, variables: { input: pin2input } })

		const pin2 = pin2result.data.createPin
		pinsToRemove.push(pin2)

		expect(pin2.routes.edges).toHaveLength(1)
		const route = pin2.routes.edges[0].node
		routesToRemove.push(route)
		expect(route.pins.edges).toHaveLength(2)
		expect(route.pins.edges[0].node.uid).toBe(pin1.uid)
		expect(route.pins.edges[1].node.uid).toBe(pin2.uid)

		/**
		 * Create the third pin, in the existing route, after the first pin
		 */

		const pin3input = {
			title: 'pin C',
			lat: 146.126,
			lng: 112.444,
			addToMaps: [maps[0].uid],
			addToRoute: {
				connectToPin: pin1.uid,
				routeUid: route.uid,
			},
		}
		const pin3result = await request(addMutation, { context, variables: { input: pin3input } })
		const pin3 = pin3result.data.createPin
		pinsToRemove.push(pin2)

		expect(pin3.routes.edges).toHaveLength(1)
		const updatedRoute = pin3.routes.edges[0].node
		expect(updatedRoute.pins.edges).toHaveLength(3)
		/**
		 * The route should now be [A, C, B]
		 */
		expect(updatedRoute.pins.edges[0].node.uid).toBe(pin1.uid)
		expect(updatedRoute.pins.edges[1].node.uid).toBe(pin3.uid)
		expect(updatedRoute.pins.edges[2].node.uid).toBe(pin2.uid)
	})
})
