// @flow
import { query } from 'Database'
import type { MapType } from '../MapTypes'
import { publicFields } from './mapDBSchema'

// const debug = require('debug')('api')

export const getClassroomMaps = async (classroomUid: string): Promise<Array<MapType> | null | Error> => {
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

export const getPinMaps = async (pinUid: string): Promise<Array<MapType> | null | Error> => {
	const q = /* GraphQL */ `
		query getMaps($pinUid: string) {
			getMaps(func: eq(type, "map")) @filter(uid_in(has_pin, ${pinUid})) {
				${publicFields}
			}
		}
	`
	const variables = { pinUid }
	const result = await query(q, variables)
	return result.getMaps
}
