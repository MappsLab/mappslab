// @flow
import type { PinType, UpdatePinArgs } from '../PinTypes'
import { clean, validateUpdate } from './pinDBSchema'
import { ValidationError } from 'Errors'
import { mutateNode, createEdge } from 'Database'

export const updatePin = async (args: UpdatePinArgs): Promise<PinType> => {
	const { uid, addToMaps, ...pinData } = args
	const cleaned = await clean(pinData)
	const validatedPinData = await validateUpdate(cleaned)
	const updatedPin: PinType = await mutateNode(uid, validatedPinData)
	if (addToMaps) {
		await Promise.all(
			addToMaps.map((mapUid) => {
				return createEdge({ fromUid: mapUid, pred: 'has_pin', toUid: updatedPin.uid }, {})
			}),
		)
	}
	return updatedPin
}
