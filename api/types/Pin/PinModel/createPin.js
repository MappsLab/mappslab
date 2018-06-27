// @flow
import type { PinType } from '../PinTypes'
import { clean, defaultValues, validateNew } from './pinDBSchema'
import { ValidationError } from '../../../errorTypes'
import { createNodeWithEdge } from '../../../database'

const debug = require('debug')('api:pin')

export const createPin = async (pinData: PinType, ownerUid: string): Promise<PinType | void> => {
	const cleaned = await clean({ ...defaultValues, ...pinData, createdAt: new Date() })
	const validatedPinData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})
	return createNodeWithEdge(validatedPinData, { relatedUid: ownerUid, reverse: true, pred: 'pinned' })
}
