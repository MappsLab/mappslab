// @flow
import { addPin } from './addPins'
import { updatePin } from './updatePin'

export default {
	Mutation: {
		// All mutations require a valid user in the context
		updatePin,
		addPin,
		// removePin
	},
}
