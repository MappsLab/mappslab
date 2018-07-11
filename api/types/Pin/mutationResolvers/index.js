// @flow
import { addPin } from './addPins'
module.exports = {
	Mutation: {
		// All mutations require a valid user in the context
		// modifyPin
		addPin,
		// removePin
	},
}
