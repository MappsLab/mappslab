// @flow
import type { PinType } from '../PinTypes'
import { clean, defaultValues, validateNew } from './pinDBSchema'
import { ValidationError } from '../../../errorTypes'
import { createNode, createEdge } from '../../../database'
import type { DBEdge } from '../../shared/sharedTypes'

const debug = require('debug')('api:pin')

export const createPin = async (pinData: PinType): Promise<PinType | void> => {
	const cleaned = await clean({ ...defaultValues, ...pinData, createdAt: new Date() })
	const validatedPinData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})
	return createNode(validatedPinData)
}

type PinEdge = DBEdge & {
	pred: 'pinned', // '<userId> <pinned> <pinId>'
}

export const createPinConnection = async (connection: PinEdge): Promise<boolean | Error> => createEdge(connection)
