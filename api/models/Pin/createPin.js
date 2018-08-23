// @flow
import type { PinType, NewPinArgs } from '../PinTypes'
import { clean, defaultValues, validateNew } from './pinDBSchema'
import { ValidationError } from 'Errors'
import { createNodeWithEdges } from 'Database'

const debug = require('debug')('api')

export const createPin = async (args: NewPinArgs, ownerUid: string): Promise<PinType | void> => {
	const { addToMaps, lessonUids, ...pinData } = args
	const cleaned = await clean({ ...defaultValues, ...pinData, createdAt: new Date() })
	const validatedPinData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})
	const edges = []

	// Add the owner relationship (required)
	edges.push([{ fromUid: ownerUid, pred: 'pinned' }, {}])

	// Add the map relationship (optional)
	if (addToMaps) edges.push(...addToMaps.map((fromUid) => [{ fromUid, pred: 'has_pin' }, {}]))

	// Add the lesson relationships (optional)
	if (lessonUids) edges.push(...lessonUids.map((fromUid) => [{ fromUid, pred: 'has_pin' }, {}]))

	debug(validatedPinData, edges)

	return createNodeWithEdges(validatedPinData, edges)
}