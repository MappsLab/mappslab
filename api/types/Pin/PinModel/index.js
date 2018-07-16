// @flow
import { getPin, getPins } from './readPin'
import { updatePin } from './updatePin'
import { createPin } from './createPin'
import { deletePin } from './deletePin'
import { getUserPins, getMapPins } from './readPinRelationships'

export default  {
	getPin,
	getPins,
	updatePin,
	createPin,
	deletePin,
	// Relationships
	getUserPins,
	getMapPins,
}
