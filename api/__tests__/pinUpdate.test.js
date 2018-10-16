
import { request } from './utils/db'
import { getDBUsers } from './utils/user'
import { getDBPins } from './utils/pin'
import { getDBMaps } from './utils/map'

let firstPins
let firstMaps
let viewer

beforeAll(async (done) => {
	firstPins = await getDBPins()
	const users = await getDBUsers()
	viewer = users[0]
	firstMaps = await getDBMaps()
	done()
})

const query = /* GraphQL */ `
	query pin($uid: String!) {
		pin(input: { uid: $uid }) {
			uid
			title
			owner {
				uid
				name
			}
		}
	}
`

const mutation = /* GraphQL */ `
	mutation UpdatePin($uid: String!, $title: String, $lat: Float, $lng: Float, $addToMaps: [String], $lessonUids: [String]) {
		updatePin(input: { uid: $uid, title: $title, lat: $lat, lng: $lng, addToMaps: $addToMaps, lessonUids: $lessonUids }) {
			uid
			title
			lat
			lng
			owner {
				uid
				name
			}
		}
	}
`

const getVariables = () => ({
	uid: firstPins[0].uid,
	title: 'great new title, thank you',
	addToMaps: [firstMaps[0].uid],
})

describe('[updatePin]', () => {
	it('should return an error if there is no current viewer', async () => {
		const variables = getVariables()

		const result = await request(mutation, { variables })
		expect(result.errors).toMatchSnapshot()
	})

	it('should return an error if the viewer is not the owner of the pin', async () => {
		const variables = getVariables()
		const context = { viewer }
		const result = await request(mutation, { variables, context })
		expect(result.errors).toMatchSnapshot()
	})

	it('should properly update a pin', async () => {
		// save the original pin so we can reset
		const originalPinResult = await request(query, { variables: { uid: firstPins[0].uid } })
		const originalPin = originalPinResult.data.pin

		// Attempt updating
		const variables = getVariables()
		const context = { viewer: firstPins[0].owner[0] }
		const result = await request(mutation, { variables, context })
		expect(result.data.updatePin.title).toBe(variables.title)

		// Reset the pin
		const reset = await request(mutation, { variables: originalPin, context })
		expect(reset.data.updatePin.title).toBe(firstPins[0].title)
	})

	it.skip('should add and remove classroom connections', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})

	it.skip('should add and remove lesson connections', async () => {
		/* Arrange */
		// const { container, getByTestId } = render( ... )
		/* Act */
		/* Assert */
		// expect(...)
	})
})
