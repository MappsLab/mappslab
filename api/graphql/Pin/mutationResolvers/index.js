// @flow
import { createPin } from './createPins'
import { updatePin } from './updatePin'

export default {
	Mutation: {
		// All mutations require a valid user in the context
		updatePin,
		createPin,
		// removePin
	},
}
