/* eslint-disable no-undef */
import { request, getViewerForContext } from '../../../__tests__/utils'
import { getFirstPins } from './utils'
import { getFirstMaps } from '../../Map/__tests__/utils'

let firstPins
let firstMaps
let viewer

beforeAll(async (done) => {
	firstPins = await getFirstPins()
	viewer = await getViewerForContext()
	firstMaps = await getFirstMaps()

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

	// it('should update a pin', async () => {
	// 	const originalPin =
	//  /* Arrange */
	//  // const { container, getByTestId } = render( ... )
	//  /* Act */

	//  /* Assert */
	//  // expect(...)
	// })
})
