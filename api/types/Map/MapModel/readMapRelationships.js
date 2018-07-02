// @flow
import { head, prop, pipe } from 'ramda'
import { query } from '../../../database'
import type { MapType } from '../MapTypes'
import { publicFields } from './mapDBSchema'

// const debug = require('debug')('api')

export const getMapsByClassroom = async (classroomUid: string): Promise<Array<MapType> | null | Error> => {
	const q = /* GraphQL */ `
		query getMaps($classroomUid: string) {
			getMaps(func: eq(type, "map")) @filter(uid_in(~has_map, ${classroomUid})) {
				${publicFields}
			}
		}
	`
	const variables = { classroomUid }
	const result = await query(q, variables).catch((e) => console.log(e))
	return result.getMaps
}
