/* eslint-disable no-undef */
import { request, getViewerForContext } from '../../../__tests__/utils'
import { removeNode, removeEdge } from '../../../database'
import { getFirstPins } from './utils'

let firstPins

let viewer

beforeAll(async (done) => {
	firstPins = await getFirstPins()
	viewer = await getViewerForContext()

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
	mutation UpdatePin($uid: String!, $title: String, $lat: Float, $lang: Float, $mapUids: [String], $lessonUids: [String]) {
		updatePin(input: { uid: $uid, title: $title, lat: $lat, lang: $lang, mapUids: $mapUids, lessonUids: $lessonUids }) {
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

const getVariables = () => ({
	uid: firstPins[0].uid,
	title: 'great new title, thank you',
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
		const context = { viewer: firstPins[0].owner }
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
