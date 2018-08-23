// @flow
import type { MapType } from 'Types/MapTypes'
import { ValidationError } from 'Errors'
import { createNodeWithEdges } from 'Database'
import { clean, defaultValues, validateNew } from './mapDBSchema'

const debug = require('debug')('api')

export const createMap = async (pinData: MapType, classroomUid: string): Promise<MapType | void> => {
	const cleaned = await clean({ ...defaultValues, ...pinData, createdAt: new Date() })
	// $FlowFixMe
	const validatedMapData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})

	const newMap = await createNodeWithEdges(validatedMapData, [[{ fromUid: classroomUid, pred: 'has_map' }, {}]])

	return newMap
}
