// @flow
import type { PinType, UpdatePinArgs } from 'Types/PinTypes'
import { mutateNode, createEdge } from 'Database'
import { clean, validateUpdate } from './pinDBSchema'

export const updatePin = async (args: UpdatePinArgs): Promise<PinType> => {
	const { uid, addToMaps, ...pinData } = args
	const cleaned = await clean(pinData)
	// $FlowFixMe --- this is kind of a mess. Make separate out addPinToMaps / addPinToClassrooms
	const validatedPinData = await validateUpdate(cleaned)
	// $FlowFixMe
	const updatedPin: PinType = await mutateNode(uid, validatedPinData)
	if (addToMaps) {
		await Promise.all(addToMaps.map((mapUid) => createEdge({ fromUid: mapUid, pred: 'has_pin', toUid: updatedPin.uid }, {})))
	}
	return updatedPin
}
