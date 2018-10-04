// @flow
import type { PinType, NewPinData } from 'Types/PinTypes'
import { createNodeWithEdges } from 'Database'
import { clean, defaultValues, validateNew } from './pinDBSchema'

const debug = require('debug')('api')

export const createPin = async (args: NewPinData, ownerUid: string): Promise<PinType> => {
	const { addToMaps, addToLessons, ...pinData } = args
	const cleaned = await clean({ ...defaultValues, ...pinData, createdAt: new Date() })
	const validatedPinData = await validateNew(cleaned)
	const edges = []

	// Add the owner relationship (required)
	edges.push([{ fromUid: ownerUid, pred: 'pinned' }, {}])

	// Add the map relationship (optional)
	if (addToMaps) edges.push(...addToMaps.map((fromUid) => [{ fromUid, pred: 'has_pin' }, {}]))

	// Add the lesson relationships (optional)
	if (addToLessons) edges.push(...addToLessons.map((fromUid) => [{ fromUid, pred: 'has_pin' }, {}]))

	debug(validatedPinData, edges)

	const pin: PinType = await createNodeWithEdges(validatedPinData, edges)

	return pin
}
