// @flow
import type { NewMapData, MapType } from 'Types/MapTypes'
import { ValidationError } from 'Errors'
import { createNodeWithEdges } from 'Database'
import { clean, defaultValues, validateNew } from './mapDBSchema'

const debug = require('debug')('api')

export const createMap = async (input: NewMapData): Promise<MapType> => {
	const { addToClassrooms, ...mapData } = input
	const cleaned = await clean({ ...defaultValues, ...mapData, createdAt: new Date() })
	// $FlowFixMe
	const validatedMapData = await validateNew(cleaned).catch((err) => {
		debug(err.details)
		debug(err._object)
		throw new ValidationError(err)
	})

	const classroomEdges =
		addToClassrooms && addToClassrooms.length
			? addToClassrooms.map((classroomUid) => [
					{
						fromUid: classroomUid,
						pred: 'has_map',
					},
					{},
			  ])
			: []
	const newMap = await createNodeWithEdges(validatedMapData, [...classroomEdges])

	return newMap
}
