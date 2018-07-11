// @flow
import type { MapType } from '../MapTypes'
import { clean, defaultValues, validateNew } from './mapDBSchema'
import { ValidationError } from '../../../errorTypes'
import { createNodeWithEdges } from '../../../database'

const debug = require('debug')('api')

export const createMap = async (pinData: MapType, classroomUid: string): Promise<MapType | void> => {
	const cleaned = await clean({ ...defaultValues, ...pinData, createdAt: new Date() })
	const validatedMapData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})
	const newMap = await createNodeWithEdges(validatedMapData, [[{ fromUid: classroomUid, pred: 'has_map' }, {}]])
	return newMap
}
