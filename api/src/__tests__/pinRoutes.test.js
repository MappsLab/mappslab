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
			route {
				route {
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
`

describe('[addPin]', () => {
	it.only('should create a new route if no routeUid is specified', async () => {
		const users = await getDBUsers()
		const maps = await getDBMaps()

		const viewer = users[0]
		const context = {
			viewer,
		}

		const pinRouteNames = (pin) => pin.route.route.pins.edges.map((e) => e.node.title)

		/**
		 Create the first pin.
		 */
		const firstPinInput = {
			title: 'A',
			lat: 145.123,
			lng: 111.333,
			addToMaps: [maps[0].uid],
		}
		const pin1result = await request(addMutation, { context, variables: { input: firstPinInput } })
		const pin1 = pin1result.data.createPin
		pinsToRemove.push(pin1)

		/**
			Create the second pin, in a new route after the first pin => [A, B]
		 */
		const pin2input = {
			title: 'B',
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
		routesToRemove.push(pin2.route)
		expect(pin2.route.route.pins.edges).toHaveLength(2)
		expect(pinRouteNames(pin2)).toEqual(['A', 'B'])

		/**
		 * Create the third pin, in the existing route, after the first pin => [A, C, B]
		 */

		const pin3input = {
			title: 'C',
			lat: 146.126,
			lng: 112.444,
			addToMaps: [maps[0].uid],
			addToRoute: {
				connectToPin: pin1.uid,
			},
		}
		const pin3result = await request(addMutation, { context, variables: { input: pin3input } })
		const pin3 = pin3result.data.createPin
		pinsToRemove.push(pin3)
		expect(pin3.route.route.pins.edges).toHaveLength(3)
		// expect(pinNames(pin3.route.route.pins)).toEqual(['A', 'C', 'B'])
		expect(pinRouteNames(pin3)).toEqual(['A', 'C', 'B'])

		/**
		 *  Create the fourth pin, *before* pin B => [A, C, D, B]
		 */
		const pin4input = {
			title: 'D',
			lat: 146.126,
			lng: 112.444,
			addToMaps: [maps[0].uid],
			addToRoute: {
				connectToPin: pin2.uid,
				position: 'BEFORE',
			},
		}

		const pin4result = await request(addMutation, { context, variables: { input: pin4input } })
		const pin4 = pin4result.data.createPin
		expect(pin4.route.route.pins.edges).toHaveLength(4)

		pinsToRemove.push(pin2)

		/**
		 * The route should now be [A, C, D, B]
		 */

		expect(pinRouteNames(pin4)).toEqual(['A', 'C', 'D', 'B'])
	})
})
