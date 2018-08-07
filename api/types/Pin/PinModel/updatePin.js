// @flow
import type { PinType, UpdatePinArgs } from '../PinTypes'
import { clean, validateUpdate } from './pinDBSchema'
import { ValidationError } from '../../../errorTypes'
import { mutateNode } from '../../../database'

export const updatePin = async (args: UpdatePinArgs): Promise<PinType> => {
	const { uid, ...pinData } = args
	const cleaned = await clean(pinData)
	const validatedPinData = await validateUpdate(cleaned)
	const result: PinType = await mutateNode(uid, validatedPinData)
	return result
}
